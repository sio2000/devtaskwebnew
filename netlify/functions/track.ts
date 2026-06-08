import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

// ─── User-agent parsing (lightweight, dependency-free) ──────────────────────
function parseDevice(ua: string): 'mobile' | 'tablet' | 'desktop' {
  const s = ua.toLowerCase();
  if (/ipad|tablet|playbook|silk|kindle|(android(?!.*mobi))/i.test(s)) return 'tablet';
  if (/mobi|iphone|ipod|android.*mobi|windows phone|blackberry/i.test(s)) return 'mobile';
  return 'desktop';
}
function parseBrowser(ua: string): string {
  if (/edg/i.test(ua)) return 'Edge';
  if (/opr|opera/i.test(ua)) return 'Opera';
  if (/samsungbrowser/i.test(ua)) return 'Samsung';
  if (/chrome|crios/i.test(ua)) return 'Chrome';
  if (/firefox|fxios/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua)) return 'Safari';
  return 'Other';
}
function parseOS(ua: string): string {
  if (/windows/i.test(ua)) return 'Windows';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/mac os/i.test(ua)) return 'macOS';
  if (/android/i.test(ua)) return 'Android';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Other';
}

const dayKey = (d = new Date()) => `day:${d.toISOString().slice(0, 10)}`;
const clampStr = (v: unknown, n: number) => (typeof v === 'string' ? v.slice(0, n) : '');

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* ignore malformed */
  }

  const path = clampStr(body.path, 256) || '/';
  // Never record the admin area
  if (path.startsWith('/admin')) return new Response(null, { status: 204 });

  const ua = req.headers.get('user-agent') || '';
  const geo = (context as unknown as { geo?: { country?: { code?: string; name?: string }; city?: string } }).geo || {};

  const event = {
    t: Date.now(),
    type: body.type === 'duration' ? 'duration' : 'pageview',
    p: path,
    d: typeof body.duration === 'number' ? Math.min(Math.round(body.duration), 1000 * 60 * 60) : undefined,
    dev: parseDevice(ua),
    br: parseBrowser(ua),
    os: parseOS(ua),
    country: geo.country?.code || geo.country?.name || 'XX',
    city: geo.city || '',
    ref: clampStr(body.ref, 256),
    lang: clampStr(body.lang, 16),
    vid: clampStr(body.vid, 64),
    sid: clampStr(body.sid, 64),
  };

  try {
    const store = getStore({ name: 'analytics', consistency: 'strong' });
    const key = dayKey();
    const existing = (await store.get(key, { type: 'json' })) as unknown[] | null;
    const arr = Array.isArray(existing) ? existing : [];
    arr.push(event);
    // Bound per-day size to keep reads fast
    const capped = arr.length > 8000 ? arr.slice(arr.length - 8000) : arr;
    await store.setJSON(key, capped);
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};
