import type { Context } from '@netlify/functions';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

// Where contact submissions are delivered (your real inbox). Override via Netlify env var.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'devtaskhub@gmail.com';
// Verified Resend sender on your domain. Override via Netlify env var.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'DevTaskHub <info@devtaskhub.com>';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') return json({ error: 'Method Not Allowed' }, 405);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ error: 'Email service not configured' }, 500);

  let body: Record<string, string> = {};
  try {
    const ct = req.headers.get('content-type') || '';
    body = ct.includes('application/json')
      ? await req.json()
      : Object.fromEntries(new URLSearchParams(await req.text()));
  } catch {
    return json({ error: 'Invalid payload' }, 400);
  }

  // Honeypot — silently accept and drop bots
  if ((body['bot-field'] || '').trim()) return json({ ok: true });

  const name = (body.name || '').trim().slice(0, 200);
  const email = (body.email || '').trim().slice(0, 200);
  const service = (body.service || '').trim().slice(0, 200);
  const subject = (body.subject || '').trim().slice(0, 300);
  const message = (body.message || '').trim().slice(0, 5000);

  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!name || !validEmail || !message) return json({ error: 'Missing or invalid fields' }, 422);

  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;max-width:560px;margin:auto;color:#0f172a">
      <h2 style="margin:0 0 16px">Νέο μήνυμα από τη φόρμα DevTaskHub</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#64748b;width:120px">Όνομα</td><td style="padding:6px 0"><b>${esc(name)}</b></td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Email</td><td style="padding:6px 0"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        ${service ? `<tr><td style="padding:6px 0;color:#64748b">Υπηρεσία</td><td style="padding:6px 0">${esc(service)}</td></tr>` : ''}
        ${subject ? `<tr><td style="padding:6px 0;color:#64748b">Θέμα</td><td style="padding:6px 0">${esc(subject)}</td></tr>` : ''}
      </table>
      <div style="margin-top:16px;padding:16px;background:#f1f5f9;border-radius:12px;white-space:pre-wrap;font-size:14px;line-height:1.6">${esc(message)}</div>
    </div>`;

  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: subject ? `[DevTaskHub] ${subject}` : `[DevTaskHub] Νέο μήνυμα από ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    return json({ error: 'Send failed', detail }, 502);
  }

  return json({ ok: true });
};
