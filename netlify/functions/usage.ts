import type { Context } from '@netlify/functions';

// ─────────────────────────────────────────────────────────────
// Plan usage for every app, read live from Supabase, Neon and Resend.
// Every key is read server-side from the Netlify environment and never
// reaches the browser. Only numbers leave this function.
// ─────────────────────────────────────────────────────────────

const MB = 1024 * 1024;
const GB = 1024 * MB;

// Free-plan ceilings (checked against the pricing pages on 7 Oct 2026).
// When an app moves to a paid plan, change the numbers here.
const LIMITS = {
  supabase: { plan: 'Free', dbBytes: 500 * MB, storageBytes: 1 * GB, mau: 50_000 },
  neon: { plan: 'Free', storageBytes: 1 * GB, computeHours: 100, transferBytes: 5 * GB },
  resend: { plan: 'Free', perMonth: 3_000, perDay: 100 },
};

const UPGRADE = {
  supabase: 'https://supabase.com/dashboard/org/_/billing',
  neon: 'https://console.neon.tech/app/billing',
  resend: 'https://resend.com/settings/billing',
};

interface AppConfig {
  id: string;
  name: string;
  env: string; // prefix of this app's environment variables
  supabase?: boolean;
  neon?: boolean;
  mailDomain?: string;
}

const APPS: AppConfig[] = [
  { id: 'lifemuseum', name: 'LifeMuseum', env: 'LIFEMUSEUM', supabase: true, mailDomain: 'lifemuseumapp.com' },
  { id: 'lumora', name: 'Lumora Predictions', env: 'LUMORA', supabase: true, mailDomain: 'lumorapredictions.com' },
  { id: 'yourbuddyfy', name: 'YourBuddyfy', env: 'YOURBUDDYFY', neon: true, mailDomain: 'yourbuddyfy.com' },
  { id: 'hournook', name: 'Hournook', env: 'HOURNOOK', neon: true, mailDomain: 'hournook.com' },
];

type Unit = 'bytes' | 'count' | 'hours';
type MetricStatus = 'ok' | 'missing' | 'error' | 'unavailable';

interface Metric {
  key: string;
  label: string;
  unit: Unit;
  status: MetricStatus;
  used: number | null;
  limit: number | null;
  period?: string;
  note?: string;
  message?: string;
  fullAt?: number; // when the limit is reached at the current pace, if before the reset
  resetsAt?: number;
}

interface Service {
  provider: 'supabase' | 'neon' | 'resend';
  plan: string;
  upgradeUrl: string;
  metrics: Metric[];
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const env = (name: string) => (process.env[name] || '').trim();

const errText = (e: unknown) => (e instanceof Error ? e.message : 'Άγνωστο σφάλμα');

const call = async (url: string, init: RequestInit = {}): Promise<Response> =>
  fetch(url, { ...init, signal: AbortSignal.timeout(8000) });

const getJson = async <T>(url: string, init: RequestInit = {}): Promise<T> => {
  const res = await call(url, init);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${res.status} ${body.slice(0, 140)}`);
  }
  return (await res.json()) as T;
};

// Straight-line projection of a counter that resets at the end of its period.
const forecast = (used: number, limit: number, start: number, end: number): Pick<Metric, 'fullAt' | 'resetsAt'> => {
  const now = Date.now();
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= now) return {};
  if (used >= limit) return { fullAt: now, resetsAt: end };
  const elapsed = now - start;
  if (used <= 0 || elapsed < 12 * 60 * 60 * 1000) return { resetsAt: end };
  const fullAt = now + ((limit - used) / used) * elapsed;
  return fullAt < end ? { fullAt, resetsAt: end } : { resetsAt: end };
};

const ok = (key: string, label: string, unit: Unit, used: number, limit: number, extra: Partial<Metric> = {}): Metric => ({
  key, label, unit, status: 'ok', used, limit, ...extra,
});
const missing = (key: string, label: string, unit: Unit, limit: number | null, message: string): Metric => ({
  key, label, unit, status: 'missing', used: null, limit, message,
});
const failed = (key: string, label: string, unit: Unit, limit: number | null, e: unknown): Metric => ({
  key, label, unit, status: 'error', used: null, limit, message: errText(e),
});

// ─── Supabase ───────────────────────────────────────────────

interface SupabaseUser { last_sign_in_at?: string | null }

const supabaseUsers = async (url: string, key: string) => {
  const since = Date.now() - 30 * 24 * 60 * 60 * 1000;
  let total = 0;
  let active = 0;
  for (let page = 1; page <= 60; page++) {
    const data = await getJson<{ users: SupabaseUser[] }>(`${url}/auth/v1/admin/users?per_page=1000&page=${page}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    const users = data.users || [];
    total += users.length;
    active += users.filter((u) => u.last_sign_in_at && Date.parse(u.last_sign_in_at) >= since).length;
    if (users.length < 1000) break;
  }
  return { total, active };
};

interface StorageEntry { name: string; id: string | null; metadata?: { size?: number } | null }

const supabaseStorage = async (url: string, key: string) => {
  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'content-type': 'application/json' };
  const buckets = await getJson<{ id: string }[]>(`${url}/storage/v1/bucket`, { headers });
  const queue = buckets.map((b) => ({ bucket: b.id, prefix: '' }));
  let bytes = 0;
  let requests = 0;
  let partial = false;
  const deadline = Date.now() + 7000;

  const listFolder = async (next: { bucket: string; prefix: string }) => {
    for (let offset = 0; ; offset += 1000) {
      if (requests >= 400 || Date.now() > deadline) {
        partial = true;
        return;
      }
      requests++;
      const entries = await getJson<StorageEntry[]>(`${url}/storage/v1/object/list/${encodeURIComponent(next.bucket)}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ prefix: next.prefix, limit: 1000, offset }),
      });
      for (const e of entries) {
        if (e.id === null) queue.push({ bucket: next.bucket, prefix: `${next.prefix}${e.name}/` });
        else bytes += e.metadata?.size || 0;
      }
      if (entries.length < 1000) break;
    }
  };
  // Folders are discovered as we go, so the tree is walked a few folders at a time.
  while (queue.length && !partial) await Promise.all(queue.splice(0, 8).map(listFolder));
  return { bytes, partial };
};

// With the account token the numbers come straight from the database in one query.
const supabaseSql = async (ref: string, token: string) => {
  const query =
    "select pg_database_size(current_database())::bigint as db, (select count(*) from auth.users) as total, " +
    "(select count(*) from auth.users where last_sign_in_at >= now() - interval '30 days') as active";
  type Row = { db: number | string; total: number | string; active: number | string };
  const run = (path: string) =>
    getJson<Row[]>(`https://api.supabase.com/v1/projects/${ref}/database/${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ query }),
    });
  // A read-only token is enough for the first endpoint; if it refuses, try the full one.
  const rows = await run('query/read-only').catch(() => run('query'));
  return { db: Number(rows[0]?.db ?? 0), total: Number(rows[0]?.total ?? 0), active: Number(rows[0]?.active ?? 0) };
};

const supabaseService = async (app: AppConfig): Promise<Service> => {
  const L = LIMITS.supabase;
  const url = env(`${app.env}_SUPABASE_URL`).replace(/\/+$/, '');
  const key = env(`${app.env}_SUPABASE_SECRET_KEY`);
  const token = env('SUPABASE_ACCESS_TOKEN');
  const ref = url.replace(/^https?:\/\//, '').split('.')[0];
  const needKey = `Λείπει το ${app.env}_SUPABASE_URL ή το ${app.env}_SUPABASE_SECRET_KEY.`;

  const sql = url && token ? supabaseSql(ref, token) : null;
  sql?.catch(() => undefined);
  const mauNote = (total: number) => `Σύνολο λογαριασμών: ${total}. Μετράει όσους έκαναν σύνδεση, άρα είναι κατά προσέγγιση.`;

  const db = async (): Promise<Metric> => {
    if (!url) return missing('db', 'Μέγεθος βάσης', 'bytes', L.dbBytes, needKey);
    if (!sql) return missing('db', 'Μέγεθος βάσης', 'bytes', L.dbBytes, 'Λείπει το SUPABASE_ACCESS_TOKEN (personal access token του λογαριασμού).');
    try {
      return ok('db', 'Μέγεθος βάσης', 'bytes', (await sql).db, L.dbBytes, { note: 'Ανά project.' });
    } catch (e) {
      return failed('db', 'Μέγεθος βάσης', 'bytes', L.dbBytes, e);
    }
  };
  const storage = async (): Promise<Metric> => {
    if (!url || !key) return missing('storage', 'Αρχεία (storage)', 'bytes', L.storageBytes, needKey);
    try {
      const s = await supabaseStorage(url, key);
      return ok('storage', 'Αρχεία (storage)', 'bytes', s.bytes, L.storageBytes, {
        note: s.partial ? 'Μερική μέτρηση, υπάρχουν πολλά αρχεία. Το πραγματικό είναι μεγαλύτερο.' : undefined,
      });
    } catch (e) {
      return failed('storage', 'Αρχεία (storage)', 'bytes', L.storageBytes, e);
    }
  };
  const mau = async (): Promise<Metric> => {
    const period = 'τελευταίες 30 ημέρες';
    if (sql) {
      try {
        const r = await sql;
        return ok('mau', 'Ενεργοί χρήστες μήνα', 'count', r.active, L.mau, { period, note: mauNote(r.total) });
      } catch {
        /* fall back to the auth API below */
      }
    }
    if (!url || !key) return missing('mau', 'Ενεργοί χρήστες μήνα', 'count', L.mau, needKey);
    try {
      const u = await supabaseUsers(url, key);
      return ok('mau', 'Ενεργοί χρήστες μήνα', 'count', u.active, L.mau, { period, note: mauNote(u.total) });
    } catch (e) {
      // The auth API fails on projects that hold user rows inserted by SQL with empty columns.
      if (/Database error finding users/.test(errText(e))) {
        return missing('mau', 'Ενεργοί χρήστες μήνα', 'count', L.mau, 'Η λίστα χρηστών του Supabase δεν απαντά για αυτό το project. Με το SUPABASE_ACCESS_TOKEN μετριέται απευθείας από τη βάση.');
      }
      return failed('mau', 'Ενεργοί χρήστες μήνα', 'count', L.mau, e);
    }
  };

  const metrics = await Promise.all([db(), storage(), mau()]);
  metrics.push({
    key: 'egress', label: 'Egress (κίνηση δεδομένων)', unit: 'bytes', status: 'unavailable', used: null, limit: 5 * GB,
    message: 'Το Supabase δεν το δίνει μέσω API. Φαίνεται μόνο στο dashboard, στη σελίδα Usage.',
  });
  return { provider: 'supabase', plan: L.plan, upgradeUrl: UPGRADE.supabase, metrics };
};

// ─── Neon ───────────────────────────────────────────────────

interface NeonProject {
  id: string;
  compute_time_seconds?: number;
  data_transfer_bytes?: number;
  synthetic_storage_size?: number;
  branch_logical_size_limit_bytes?: number;
  consumption_period_start?: string;
  consumption_period_end?: string;
}

const neonProjects = async (apiKey: string): Promise<NeonProject[]> => {
  const base = 'https://console.neon.tech/api/v2';
  const headers = { Authorization: `Bearer ${apiKey}`, accept: 'application/json' };
  let list: NeonProject[];
  try {
    list = (await getJson<{ projects: NeonProject[] }>(`${base}/projects?limit=100`, { headers })).projects;
  } catch (e) {
    // Accounts that live inside an organization must name it.
    if (!/org_id/i.test(errText(e))) throw e;
    const orgs = await getJson<{ organizations: { id: string }[] }>(`${base}/users/me/organizations`, { headers });
    const lists = await Promise.all(
      orgs.organizations.map((o) => getJson<{ projects: NeonProject[] }>(`${base}/projects?limit=100&org_id=${o.id}`, { headers })),
    );
    list = lists.flatMap((l) => l.projects);
  }
  // The single-project call carries the consumption counters and the billing period.
  return Promise.all(list.map(async (p) => (await getJson<{ project: NeonProject }>(`${base}/projects/${p.id}`, { headers })).project));
};

const neonService = async (app: AppConfig): Promise<Service> => {
  const L = LIMITS.neon;
  const apiKey = env(`${app.env}_NEON_API_KEY`);
  const needApi = `Λείπει το ${app.env}_NEON_API_KEY (Neon Console, Account settings, API keys).`;

  let projects: NeonProject[] = [];
  let apiError: unknown = null;
  if (apiKey) {
    try {
      projects = await neonProjects(apiKey);
    } catch (e) {
      apiError = e;
    }
  }
  // Limits are per project, so the busiest project is the one that matters.
  const top = [...projects].sort((a, b) => (b.compute_time_seconds || 0) - (a.compute_time_seconds || 0))[0];

  // Everything here comes from the Neon API. This tab never queries the database itself:
  // a query wakes its compute, and a tab refreshing every minute would keep it awake all
  // month and burn the free CU-hours it is supposed to watch.
  const storage = (): Metric => {
    const label = 'Αποθηκευτικός χώρος';
    if (!apiKey) return missing('storage', label, 'bytes', L.storageBytes, needApi);
    if (apiError || !top) return failed('storage', label, 'bytes', L.storageBytes, apiError || new Error('Δεν βρέθηκε project στον λογαριασμό.'));
    const measured = Math.max(0, ...projects.map((p) => p.synthetic_storage_size || 0));
    return ok('storage', label, 'bytes', measured, top.branch_logical_size_limit_bytes || L.storageBytes);
  };

  const consumption = (): Metric[] => {
    const rows: [string, string, Unit, number][] = [
      ['compute', 'Compute', 'hours', L.computeHours],
      ['transfer', 'Μεταφορά δεδομένων', 'bytes', L.transferBytes],
    ];
    if (!apiKey) return rows.map(([k, l, u, lim]) => missing(k, l, u, lim, needApi));
    if (apiError || !top) return rows.map(([k, l, u, lim]) => failed(k, l, u, lim, apiError || new Error('Δεν βρέθηκε project στον λογαριασμό.')));
    const start = Date.parse(top.consumption_period_start || '');
    const end = Date.parse(top.consumption_period_end || '');
    const period = 'τρέχων μήνας χρέωσης';
    const compute = Math.round(((top.compute_time_seconds || 0) / 3600) * 100) / 100;
    const transfer = top.data_transfer_bytes || 0;
    return [
      ok('compute', 'Compute', 'hours', compute, L.computeHours, { period, ...forecast(compute, L.computeHours, start, end) }),
      ok('transfer', 'Μεταφορά δεδομένων', 'bytes', transfer, L.transferBytes, { period, ...forecast(transfer, L.transferBytes, start, end) }),
    ];
  };

  return { provider: 'neon', plan: L.plan, upgradeUrl: UPGRADE.neon, metrics: [storage(), ...consumption()] };
};

// ─── Resend ─────────────────────────────────────────────────

interface ResendEmail { id: string; from: string; created_at: string }
interface ResendCount { account: string; month: number; day: number; ownMonth: number | null; partial: boolean; monthStart: number; monthEnd: number }

const resendCount = async (apiKey: string, mailDomain?: string): Promise<ResendCount> => {
  const now = new Date();
  const monthStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
  const dayStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const deadline = Date.now() + 7000;
  let month = 0;
  let day = 0;
  let own = 0;
  let account = '';
  let after = '';
  let partial = false;

  for (let page = 0; page < 40; page++) {
    if (Date.now() > deadline) {
      partial = true;
      break;
    }
    const data = await getJson<{ has_more: boolean; data: ResendEmail[] }>(
      `https://api.resend.com/emails?limit=100${after ? `&after=${after}` : ''}`,
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );
    const emails = data.data || [];
    if (!account && emails[0]) account = emails[0].id;
    let reachedOlder = false;
    for (const e of emails) {
      const t = Date.parse(e.created_at.replace(' ', 'T'));
      if (t < monthStart) {
        reachedOlder = true;
        break;
      }
      month++;
      if (t >= dayStart) day++;
      if (mailDomain && e.from.toLowerCase().includes(`@${mailDomain}`)) own++;
    }
    if (reachedOlder || !data.has_more || !emails.length) break;
    after = emails[emails.length - 1].id;
    if (page === 39) partial = true;
  }
  const monthEnd = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1);
  return { account, month, day, ownMonth: mailDomain ? own : null, partial, monthStart, monthEnd };
};

const resendService = async (app: AppConfig): Promise<{ service: Service; account: string }> => {
  const L = LIMITS.resend;
  const apiKey = env(`${app.env}_RESEND_API_KEY`);
  const base = { provider: 'resend' as const, plan: L.plan, upgradeUrl: UPGRADE.resend };
  const both = (make: (key: string, label: string, limit: number) => Metric): Metric[] => [
    make('month', 'Emails μήνα', L.perMonth),
    make('day', 'Emails ημέρας', L.perDay),
  ];

  if (!apiKey) {
    const msg = `Λείπει το ${app.env}_RESEND_API_KEY με δικαίωμα Full access.`;
    return { account: '', service: { ...base, metrics: both((k, l, lim) => missing(k, l, 'count', lim, msg)) } };
  }
  try {
    const c = await resendCount(apiKey, app.mailDomain);
    const notes = [
      c.ownMonth !== null ? `Από αυτά, ${c.ownMonth} στάλθηκαν από το ${app.mailDomain}.` : '',
      c.partial ? 'Μερική μέτρηση, το πραγματικό είναι μεγαλύτερο.' : '',
    ].filter(Boolean).join(' ');
    return {
      account: c.account,
      service: {
        ...base,
        metrics: [
          ok('month', 'Emails μήνα', 'count', c.month, L.perMonth, {
            period: 'ημερολογιακός μήνας (UTC)',
            note: notes || undefined,
            ...forecast(c.month, L.perMonth, c.monthStart, c.monthEnd),
          }),
          ok('day', 'Emails ημέρας', 'count', c.day, L.perDay, { period: 'σήμερα (UTC)' }),
        ],
      },
    };
  } catch (e) {
    const restricted = /restricted_api_key/.test(errText(e));
    const make = (k: string, l: string, lim: number): Metric =>
      restricted
        ? missing(k, l, 'count', lim, `Το ${app.env}_RESEND_API_KEY είναι "Sending access". Χρειάζεται νέο key με Full access.`)
        : failed(k, l, 'count', lim, e);
    return { account: '', service: { ...base, metrics: both(make) } };
  }
};

// ─── Handler ────────────────────────────────────────────────

export default async (req: Request, _context: Context) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return json({ error: 'ADMIN_PASSWORD is not configured on the server.' }, 500);

  const provided = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!provided || provided !== expected) return json({ error: 'Unauthorized' }, 401);

  const apps = await Promise.all(
    APPS.map(async (app) => {
      const [db, mail] = await Promise.all([
        app.supabase ? supabaseService(app) : app.neon ? neonService(app) : null,
        resendService(app),
      ]);
      return { id: app.id, name: app.name, services: db ? [db, mail.service] : [mail.service], mailAccount: mail.account };
    }),
  );

  // Storage and active users are counted across the whole Supabase organization,
  // so every project in it shows the combined figure against the limit.
  const sharedDb = apps.filter((_, i) => APPS[i].supabase);
  if (sharedDb.length > 1) {
    for (const key of ['storage', 'mau']) {
      const rows = sharedDb.map((a) => a.services[0].metrics.find((m) => m.key === key)).filter((m): m is Metric => !!m && m.status === 'ok');
      if (rows.length < 2) continue;
      const sum = rows.reduce((n, m) => n + (m.used || 0), 0);
      for (const m of rows) {
        const own = m.used || 0;
        m.used = sum;
        m.note = [`Κοινό όριο οργανισμού (${sharedDb.map((a) => a.name).join(' + ')}). Αυτό το project μόνο του: ${key === 'storage' ? `${(own / MB).toLocaleString('el-GR', { maximumFractionDigits: 1 })} MB` : own}.`, m.note].filter(Boolean).join(' ');
      }
    }
  }

  // Apps whose keys belong to the same Resend account share one quota.
  for (const a of apps) {
    if (!a.mailAccount) continue;
    const others = apps.filter((b) => b !== a && b.mailAccount === a.mailAccount).map((b) => b.name);
    if (!others.length) continue;
    const m = a.services[a.services.length - 1].metrics[0];
    m.note = [`Κοινός λογαριασμός Resend με ${others.join(', ')}, το όριο μοιράζεται.`, m.note].filter(Boolean).join(' ');
  }

  return json({
    generatedAt: Date.now(),
    apps: apps.map((a) => ({ id: a.id, name: a.name, services: a.services })),
  });
};
