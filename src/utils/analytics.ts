// Privacy-friendly first-party analytics client.
// Sends anonymous pageview + time-on-page events to a Netlify Function.
//
// Nothing is written to the visitor's device: no cookie, no localStorage, no
// sessionStorage. The visit id and the campaign tags live in this page's
// memory only, so they are gone when the tab closes or reloads, and one person
// cannot be recognised from one visit to the next.

const ENDPOINT = '/.netlify/functions/track';

function uuid(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* noop */
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

let visitId = '';
function getVisitId(): string {
  if (!visitId) visitId = uuid();
  return visitId;
}

// Earlier versions kept an id in the browser. Remove what they left behind.
function forgetStoredIds() {
  try {
    localStorage.removeItem('dth_vid');
    sessionStorage.removeItem('dth_sid');
    sessionStorage.removeItem('dth_attr');
  } catch {
    /* storage unavailable: nothing to clean */
  }
}

export interface Attribution {
  us: string; // utm_source
  um: string; // utm_medium
  uc: string; // utm_campaign
  ut: string; // utm_content — the id of the video or post that sent the visitor
}

let attribution: Attribution | null = null;

// The campaign tags of the link the visitor arrived on. Read once and kept for
// the visit, so a form sent three pages later still knows where it began.
export function getAttribution(): Attribution {
  if (attribution) return attribution;
  const attr: Attribution = { us: '', um: '', uc: '', ut: '' };
  try {
    const q = new URLSearchParams(window.location.search);
    const pick = (k: string) => (q.get(k) || '').trim().slice(0, 64);
    attr.us = pick('utm_source').toLowerCase();
    attr.um = pick('utm_medium').toLowerCase();
    attr.uc = pick('utm_campaign');
    attr.ut = pick('utm_content');
  } catch {
    /* an address that cannot be parsed carries no campaign */
  }
  attribution = attr;
  return attr;
}

function send(payload: Record<string, unknown>) {
  try {
    const body = JSON.stringify({
      ...payload,
      ...getAttribution(),
      vid: getVisitId(),
      sid: getVisitId(),
      lang: typeof navigator !== 'undefined' ? navigator.language : '',
      ref: typeof document !== 'undefined' ? document.referrer : '',
    });
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(ENDPOINT, {
        method: 'POST',
        body,
        headers: { 'content-type': 'application/json' },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* analytics must never break the app */
  }
}

let currentPath = '';
let enterTime = 0;

export function flushDuration() {
  if (currentPath && enterTime) {
    const duration = Date.now() - enterTime;
    if (duration > 1000) send({ type: 'duration', path: currentPath, duration });
    enterTime = 0;
  }
}

export function trackPageview(path: string) {
  if (path.startsWith('/admin')) return; // never track the admin area
  flushDuration(); // close out the previous page's time
  currentPath = path;
  enterTime = Date.now();
  send({ type: 'pageview', path });
}

export type SiteAction = 'contact_submit' | 'click_phone' | 'click_email';

/** The things a visitor does that count as getting in touch. */
export function trackAction(name: SiteAction) {
  send({ type: 'event', name, path: currentPath || window.location.pathname });
}

let initialized = false;
export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  forgetStoredIds();
  getAttribution();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushDuration();
  });
  window.addEventListener('pagehide', flushDuration);
}
