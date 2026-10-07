import React, { useCallback, useEffect, useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Database, ExternalLink, Gauge, KeyRound, Loader2, Mail, RefreshCw } from 'lucide-react';

type Unit = 'bytes' | 'count' | 'hours';
type Provider = 'supabase' | 'neon' | 'resend';

interface Metric {
  key: string;
  label: string;
  unit: Unit;
  status: 'ok' | 'missing' | 'error' | 'unavailable';
  used: number | null;
  limit: number | null;
  period?: string;
  note?: string;
  message?: string;
  fullAt?: number;
  resetsAt?: number;
}
interface Service { provider: Provider; plan: string; upgradeUrl: string; metrics: Metric[] }
interface AppUsage { id: string; name: string; services: Service[] }
interface Usage { generatedAt: number; apps: AppUsage[] }

const USAGE_URL = '/.netlify/functions/usage';
const REFRESH_MS = 60000;
const WARN_AT = 70;
const CRITICAL_AT = 90;

const PROVIDER: Record<Provider, { name: string; icon: React.ElementType }> = {
  supabase: { name: 'Supabase', icon: Database },
  neon: { name: 'Neon', icon: Database },
  resend: { name: 'Resend', icon: Mail },
};

const fmt = (value: number, unit: Unit) => {
  if (unit === 'count') return value.toLocaleString('el-GR');
  if (unit === 'hours') return `${value.toLocaleString('el-GR', { maximumFractionDigits: 1 })} ώρες`;
  const mb = value / (1024 * 1024);
  return mb >= 1024
    ? `${(mb / 1024).toLocaleString('el-GR', { maximumFractionDigits: 2 })} GB`
    : `${mb.toLocaleString('el-GR', { maximumFractionDigits: 1 })} MB`;
};

const pctOf = (m: Metric) => (m.status === 'ok' && m.used !== null && m.limit ? (m.used / m.limit) * 100 : null);
const fmtPct = (p: number) => (p > 0 && p < 1 ? '<1%' : `${Math.round(p)}%`);

const SOON_MS = 7 * 24 * 60 * 60 * 1000;
const fmtDate = (t: number) => new Date(t).toLocaleDateString('el-GR', { day: 'numeric', month: 'long' });

const TONES = [
  { bar: 'bg-emerald-500', text: 'text-emerald-400', chip: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', label: 'Άνετα' },
  { bar: 'bg-amber-500', text: 'text-amber-400', chip: 'bg-amber-500/15 text-amber-300 border-amber-500/30', label: 'Πλησιάζει το όριο' },
  { bar: 'bg-red-500', text: 'text-red-400', chip: 'bg-red-500/15 text-red-300 border-red-500/30', label: 'Αναβάθμισε τώρα' },
];

// 0 fine, 1 getting close, 2 act now. A limit that runs out before it resets counts even at a low percentage.
const levelOf = (m: Metric, p: number) => {
  if (p >= CRITICAL_AT || (m.fullAt && m.fullAt - Date.now() < SOON_MS)) return 2;
  if (p >= WARN_AT || m.fullAt) return 1;
  return 0;
};
const tone = (m: Metric, p: number) => TONES[levelOf(m, p)];

const MetricRow: React.FC<{ m: Metric }> = ({ m }) => {
  const p = pctOf(m);
  if (p === null) {
    const isError = m.status === 'error';
    return (
      <div>
        <div className="flex justify-between gap-3 text-sm mb-1">
          <span className="text-slate-300">{m.label}</span>
          <span className="text-slate-500 whitespace-nowrap">όριο {m.limit !== null ? fmt(m.limit, m.unit) : '—'}</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-700/40 border border-dashed border-slate-600/60" />
        <p className={`flex items-start gap-1.5 text-xs mt-1.5 ${isError ? 'text-red-400' : 'text-slate-500'}`}>
          {m.status === 'missing' ? <KeyRound className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
          <span>{isError ? `Σφάλμα: ${m.message}` : m.message}</span>
        </p>
      </div>
    );
  }
  const t = tone(m, p);
  return (
    <div>
      <div className="flex justify-between gap-3 text-sm mb-1">
        <span className="text-slate-300">
          {m.label}
          {m.period && <span className="text-slate-500"> · {m.period}</span>}
        </span>
        <span className="text-slate-400 whitespace-nowrap">
          {fmt(m.used ?? 0, m.unit)} / {fmt(m.limit ?? 0, m.unit)} <span className={`font-semibold ${t.text}`}>{fmtPct(p)}</span>
        </span>
      </div>
      <div
        className="h-2.5 rounded-full bg-slate-700/60 overflow-hidden"
        role="progressbar"
        aria-label={m.label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(100, Math.round(p))}
      >
        <div className={`h-full rounded-full ${t.bar}`} style={{ width: `${Math.min(100, Math.max(p, 1))}%` }} />
      </div>
      {m.fullAt && (
        <p className={`flex items-start gap-1.5 text-xs font-medium mt-1.5 ${t.text}`}>
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <span>
            Με τον σημερινό ρυθμό γεμίζει στις {fmtDate(m.fullAt)}
            {m.resetsAt ? `, ενώ μηδενίζει στις ${fmtDate(m.resetsAt)}.` : '.'}
          </span>
        </p>
      )}
      {m.note && <p className="text-xs text-slate-500 mt-1.5">{m.note}</p>}
    </div>
  );
};

const UsagePanel: React.FC<{ password: string; onUnauthorized: () => void }> = ({ password, onUnauthorized }) => {
  const [data, setData] = useState<Usage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch(USAGE_URL, { headers: { Authorization: `Bearer ${password}` } });
      if (res.status === 401) return onUnauthorized();
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Σφάλμα (${res.status})`);
      }
      setData((await res.json()) as Usage);
      setError('');
    } catch (e) {
      setError(
        e instanceof Error && e.message.includes('Failed to fetch')
          ? 'Τα όρια διαβάζονται μόνο μετά το deploy στο Netlify (Functions).'
          : e instanceof Error ? e.message : 'Σφάλμα φόρτωσης.',
      );
    } finally {
      setLoading(false);
    }
  }, [password, onUnauthorized]);

  useEffect(() => {
    load();
    const id = setInterval(() => load(true), REFRESH_MS);
    return () => clearInterval(id);
  }, [load]);

  const rows = (data?.apps ?? []).flatMap((app) =>
    app.services.flatMap((s) => s.metrics.map((m) => ({ app, service: s, metric: m, pct: pctOf(m) }))),
  );
  const measured = rows
    .filter((r): r is typeof r & { pct: number } => r.pct !== null)
    .sort((a, b) => levelOf(b.metric, b.pct) - levelOf(a.metric, a.pct) || (a.metric.fullAt ?? Infinity) - (b.metric.fullAt ?? Infinity) || b.pct - a.pct);
  const top = measured[0];
  const warnings = measured.filter((r) => levelOf(r.metric, r.pct) > 0).length;
  const blind = rows.filter((r) => r.metric.status === 'missing' || r.metric.status === 'error').length;

  if (!data) {
    return (
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-10 flex items-center justify-center gap-3 text-slate-400">
        {error ? <><AlertCircle className="w-5 h-5 text-amber-400" /> {error}</> : <><Loader2 className="w-5 h-5 animate-spin" /> Φόρτωση ορίων…</>}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="text-sm text-slate-400">
          Ζωντανά από Supabase, Neon και Resend · ανανέωση κάθε 1 λεπτό · τελευταία {new Date(data.generatedAt).toLocaleTimeString('el-GR')}
        </p>
        <button
          onClick={() => load()}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-300 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Ανανέωση
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 text-sm text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
          <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2"><Gauge className="w-4 h-4" /> Πιο επείγον όριο</div>
          {top ? (
            <>
              <div className={`text-3xl font-bold tracking-tight ${tone(top.metric, top.pct).text}`}>{fmtPct(top.pct)}</div>
              <div className="text-sm text-slate-300 mt-1">{top.app.name} · {PROVIDER[top.service.provider].name} · {top.metric.label}</div>
              {top.metric.fullAt && <div className="text-xs text-slate-400 mt-1">Γεμίζει στις {fmtDate(top.metric.fullAt)}</div>}
            </>
          ) : <div className="text-sm text-slate-500">Καμία μέτρηση ακόμη.</div>}
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            {warnings ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />} Όρια σε κίνδυνο
          </div>
          <div className={`text-3xl font-bold tracking-tight ${warnings ? 'text-amber-400' : 'text-emerald-400'}`}>{warnings}</div>
          <div className="text-sm text-slate-300 mt-1">{warnings ? 'Πάνω από ' + WARN_AT + '% ή τελειώνουν πριν μηδενίσουν.' : 'Δεν χρειάζεται αναβάθμιση τώρα.'}</div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2"><KeyRound className="w-4 h-4" /> Μετρήσεις που δεν βλέπω</div>
          <div className={`text-3xl font-bold tracking-tight ${blind ? 'text-slate-200' : 'text-emerald-400'}`}>{blind}</div>
          <div className="text-sm text-slate-300 mt-1">{blind ? 'Λείπει κλειδί, δες τις σημειώσεις παρακάτω.' : 'Όλα τα κλειδιά είναι στη θέση τους.'}</div>
        </div>
      </div>

      {/* Closest to the ceiling */}
      {measured.length > 0 && (
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 mb-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">Πού θα χρειαστεί πρώτα αναβάθμιση</h3>
          <div className="space-y-3">
            {measured.slice(0, 6).map((r) => {
              const t = tone(r.metric, r.pct);
              return (
                <div key={`${r.app.id}-${r.service.provider}-${r.metric.key}`} className="flex items-center gap-3">
                  <div className="w-44 sm:w-72 text-sm text-slate-300 truncate">
                    <span className="text-white font-medium">{r.app.name}</span> · {PROVIDER[r.service.provider].name} · {r.metric.label}
                  </div>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-700/60 overflow-hidden">
                    <div className={`h-full rounded-full ${t.bar}`} style={{ width: `${Math.min(100, Math.max(r.pct, 1))}%` }} />
                  </div>
                  <div className={`w-28 text-right text-sm font-semibold whitespace-nowrap ${t.text}`}>
                    {fmtPct(r.pct)}
                    {r.metric.fullAt && <span className="font-normal"> · {new Date(r.metric.fullAt).toLocaleDateString('el-GR', { day: 'numeric', month: 'numeric' })}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* One card per app */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.apps.map((app) => {
          const own = measured.filter((r) => r.app.id === app.id);
          const worst = own[0] ?? null;
          return (
            <section key={app.id} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5">
              <div className="flex items-center justify-between gap-3 mb-5">
                <h3 className="text-lg font-bold text-white">{app.name}</h3>
                {worst !== null ? (
                  <span className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${tone(worst.metric, worst.pct).chip}`}>
                    {tone(worst.metric, worst.pct).label} · {fmtPct(worst.pct)}
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg border border-slate-600 text-xs font-semibold text-slate-400">Χωρίς μετρήσεις</span>
                )}
              </div>
              <div className="space-y-6">
                {app.services.map((s) => {
                  const Icon = PROVIDER[s.provider].icon;
                  return (
                    <div key={s.provider}>
                      <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-slate-700/60">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                          <Icon className="w-4 h-4 text-indigo-400" /> {PROVIDER[s.provider].name}
                          <span className="px-2 py-0.5 rounded-md bg-slate-700/70 text-xs font-medium text-slate-300">{s.plan}</span>
                        </div>
                        <a
                          href={s.upgradeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-indigo-300 hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                        >
                          Αναβάθμιση <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <div className="space-y-4">
                        {s.metrics.map((m) => <MetricRow key={m.key} m={m} />)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <p className="text-xs text-slate-600 mt-6 text-center">
        Πράσινο κάτω από {WARN_AT}% · πορτοκαλί από {WARN_AT}% ή αν τελειώνει πριν μηδενίσει · κόκκινο από {CRITICAL_AT}% ή αν τελειώνει μέσα σε 7 ημέρες. Τα όρια είναι του δωρεάν πλάνου κάθε υπηρεσίας.
      </p>
    </div>
  );
};

export default UsagePanel;
