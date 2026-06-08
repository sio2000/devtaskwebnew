// Privacy-friendly first-party analytics client.
// Sends anonymous pageview + time-on-page events to a Netlify Function.
// No personal data, no third-party cookies — just an anonymous random id in localStorage.

const ENDPOINT = '/.netlify/functions/track';

function uuid(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* noop */
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem('dth_vid');
    if (!id) {
      id = uuid();
      localStorage.setItem('dth_vid', id);
    }
    return id;
  } catch {
    return 'anon';
  }
}

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem('dth_sid');
    if (!id) {
      id = uuid();
      sessionStorage.setItem('dth_sid', id);
    }
    return id;
  } catch {
    return 'anon';
  }
}

function send(payload: Record<string, unknown>) {
  try {
    const body = JSON.stringify({
      ...payload,
      vid: getVisitorId(),
      sid: getSessionId(),
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

let initialized = false;
export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushDuration();
  });
  window.addEventListener('pagehide', flushDuration);
}
