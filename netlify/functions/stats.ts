import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

interface Ev {
  t: number;
  type: 'pageview' | 'duration' | 'event';
  n?: string;
  us?: string;
  um?: string;
  uc?: string;
  ut?: string;
  p: string;
  d?: number;
  dev: string;
  br: string;
  os: string;
  country: string;
  city: string;
  ref: string;
  lang: string;
  vid: string;
  sid: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const tally = (items: string[]) => {
  const m: Record<string, number> = {};
  for (const it of items) m[it] = (m[it] || 0) + 1;
  return Object.entries(m)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

const hostOf = (ref: string) => {
  try {
    return new URL(ref).hostname.replace(/^(www|m|l|lm)\./, '');
  } catch {
    return '';
  }
};

// One readable channel per visit: the campaign tag when the link carried one,
// otherwise the site the visitor came from.
const channelOf = (e: Ev) => {
  const src = (e.us || '').toLowerCase();
  const host = hostOf(e.ref || '');
  const hit = (re: RegExp) => re.test(src) || re.test(host);
  if (hit(/instagram/)) return 'Instagram';
  if (hit(/tiktok/)) return 'TikTok';
  if (hit(/facebook|fb\.com|fb\.me/)) return 'Facebook';
  if (hit(/youtube|youtu\.be/)) return 'YouTube';
  if (hit(/linkedin|lnkd\.in/)) return 'LinkedIn';
  if (hit(/google/)) return 'Google';
  if (hit(/bing|duckduckgo|yahoo/)) return 'Άλλη αναζήτηση';
  if (src) return src;
  if (host && !/devtaskhub\.com$/.test(host)) return host;
  return 'Απευθείας';
};

export default async (req: Request, _context: Context) => {
  // ─── Auth: password checked server-side against the Netlify env var ───
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return json({ error: 'ADMIN_PASSWORD is not configured on the server.' }, 500);

  const auth = req.headers.get('authorization') || '';
  const provided = auth.replace(/^Bearer\s+/i, '').trim();
  if (!provided || provided !== expected) return json({ error: 'Unauthorized' }, 401);

  const url = new URL(req.url);
  const days = Math.min(Math.max(parseInt(url.searchParams.get('days') || '30', 10) || 30, 1), 90);

  // ─── Load events for the requested window ───
  const store = getStore({ name: 'analytics', consistency: 'strong' });
  const events: Ev[] = [];
  const now = new Date();
  const dayBuckets: { date: string; views: number; visitors: Set<string> }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(now.getUTCDate() - i);
    const date = d.toISOString().slice(0, 10);
    const bucket = { date, views: 0, visitors: new Set<string>() };
    dayBuckets.push(bucket);
    try {
      const arr = (await store.get(`day:${date}`, { type: 'json' })) as Ev[] | null;
      if (Array.isArray(arr)) {
        for (const e of arr) {
          events.push(e);
          if (e.type === 'pageview') {
            bucket.views++;
            if (e.vid) bucket.visitors.add(e.vid);
          }
        }
      }
    } catch {
      /* missing day */
    }
  }

  const pageviews = events.filter((e) => e.type === 'pageview');
  const durations = events.filter((e) => e.type === 'duration' && typeof e.d === 'number');

  // ─── Session durations (max-min timestamp per session) ───
  const sessionTimes: Record<string, { min: number; max: number }> = {};
  for (const e of events) {
    if (!e.sid) continue;
    const s = sessionTimes[e.sid] || { min: e.t, max: e.t };
    s.min = Math.min(s.min, e.t);
    s.max = Math.max(s.max, e.t);
    sessionTimes[e.sid] = s;
  }
  const sessionDurations = Object.values(sessionTimes).map((s) => s.max - s.min);
  const avgSession = sessionDurations.length
    ? Math.round(sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length / 1000)
    : 0;
  const avgTimeOnPage = durations.length
    ? Math.round(durations.reduce((a, b) => a + (b.d || 0), 0) / durations.length / 1000)
    : 0;

  const uniqueVisitors = new Set(pageviews.map((e) => e.vid).filter(Boolean)).size;
  const sessions = new Set(pageviews.map((e) => e.sid).filter(Boolean)).size;

  // ─── Live: unique visitors active in the last 5 minutes ───
  const fiveMinAgo = Date.now() - 5 * 60 * 1000;
  const liveNow = new Set(events.filter((e) => e.t >= fiveMinAgo).map((e) => e.vid).filter(Boolean)).size;

  // ─── Recent visits feed (latest pageviews) ───
  const recent = [...pageviews]
    .sort((a, b) => b.t - a.t)
    .slice(0, 60)
    .map((e) => ({ t: e.t, p: e.p, dev: e.dev, br: e.br, os: e.os, country: e.country, city: e.city, ref: e.ut ? `${channelOf(e)} · ${e.ut}` : channelOf(e) }));

  const bounceSessions = Object.entries(
    pageviews.reduce((acc: Record<string, number>, e) => {
      if (e.sid) acc[e.sid] = (acc[e.sid] || 0) + 1;
      return acc;
    }, {})
  );
  const bounceRate = bounceSessions.length
    ? Math.round((bounceSessions.filter(([, c]) => c <= 1).length / bounceSessions.length) * 100)
    : 0;

  // ─── Where each visit began, and which visits got in touch ───
  const firstView: Record<string, Ev> = {};
  for (const e of pageviews) {
    if (!e.sid) continue;
    if (!firstView[e.sid] || e.t < firstView[e.sid].t) firstView[e.sid] = e;
  }
  const actions = events.filter((e) => e.type === 'event' && e.n);
  const contactSessions = new Set(actions.filter((e) => e.n === 'contact_submit').map((e) => e.sid));
  const visits = Object.entries(firstView);

  const channelRows: Record<string, { sessions: number; contacts: number }> = {};
  const contentRows: Record<string, { channel: string; sessions: number; contacts: number }> = {};
  for (const [sid, e] of visits) {
    const channel = channelOf(e);
    const row = channelRows[channel] || { sessions: 0, contacts: 0 };
    row.sessions++;
    if (contactSessions.has(sid)) row.contacts++;
    channelRows[channel] = row;
    if (e.ut) {
      const key = `${e.ut}|${channel}`;
      const c = contentRows[key] || { channel, sessions: 0, contacts: 0 };
      c.sessions++;
      if (contactSessions.has(sid)) c.contacts++;
      contentRows[key] = c;
    }
  }
  const channels = Object.entries(channelRows)
    .map(([name, v]) => ({ name, value: v.sessions, contacts: v.contacts }))
    .sort((a, b) => b.value - a.value);
  const content = Object.entries(contentRows)
    .map(([key, v]) => ({ id: key.split('|')[0], channel: v.channel, sessions: v.sessions, contacts: v.contacts }))
    .sort((a, b) => b.contacts - a.contacts || b.sessions - a.sessions)
    .slice(0, 40);

  return json({
    generatedAt: Date.now(),
    rangeDays: days,
    totals: {
      pageviews: pageviews.length,
      uniqueVisitors,
      sessions,
      liveNow,
      avgSessionSec: avgSession,
      avgTimeOnPageSec: avgTimeOnPage,
      bounceRate,
      contacts: contactSessions.size,
      phoneClicks: actions.filter((e) => e.n === 'click_phone').length,
      emailClicks: actions.filter((e) => e.n === 'click_email').length,
    },
    channels,
    content,
    timeseries: dayBuckets.map((b) => ({ date: b.date, views: b.views, visitors: b.visitors.size })),
    devices: tally(pageviews.map((e) => e.dev)),
    browsers: tally(pageviews.map((e) => e.br)),
    os: tally(pageviews.map((e) => e.os)),
    topPages: tally(pageviews.map((e) => e.p)).slice(0, 12),
    countries: tally(pageviews.map((e) => e.country || 'XX')).slice(0, 12),
    referrers: tally(visits.map(([, e]) => hostOf(e.ref || '') || 'Απευθείας')).slice(0, 12),
    languages: tally(pageviews.map((e) => e.lang || 'unknown')).slice(0, 8),
    recent,
  });
};
