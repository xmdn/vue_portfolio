/**
 * Cloudflare Worker entry point.
 *
 * Serves the built Vue SPA (see `assets` in wrangler.jsonc) and adds a single
 * dynamic endpoint:
 *
 *   POST /api/contact  →  relays the contact form to your inbox via Resend.
 *
 * Required configuration (see README → "Contact form"):
 *   RESEND_API_KEY  (secret)  – your Resend API key
 *   CONTACT_TO      (secret)  – the inbox that receives the messages
 *   CONTACT_FROM    (var)     – verified "from" address, e.g. portfolio@yourdomain.com
 *
 * The endpoint only runs for `/api/*` (see `assets.run_worker_first`), so every
 * other request is served straight from the static asset bundle.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
}

const LIMITS = { name: 120, email: 200, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS_HEADERS },
  })
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Validates and normalises the submitted payload. */
function parsePayload(payload) {
  const name = String(payload?.name ?? '').trim()
  const email = String(payload?.email ?? '').trim()
  const message = String(payload?.message ?? '').trim()

  if (!name || name.length > LIMITS.name)
    return { error: 'Please enter your name.' }
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    return { error: 'Please enter a valid email address.' }
  if (!message || message.length > LIMITS.message)
    return { error: 'Please write a message.' }

  return { name, email, message }
}

async function handleContact(request, env) {
  let payload

  try {
    payload = await request.json()
  }
  catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400)
  }

  const parsed = parsePayload(payload)

  if (parsed.error)
    return json({ ok: false, error: parsed.error }, 422)

  const { name, email, message } = parsed

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM)
    return json({ ok: false, error: 'Mail service is not configured yet.' }, 500)

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 12px">New portfolio message</h2>
      <p style="margin:0 0 6px"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 6px"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <hr style="margin:16px 0;border:none;border-top:1px solid #e5e7eb" />
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
    </div>
  `

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html,
    }),
  })

  if (!response.ok) {
    console.error('Resend request failed', response.status, await response.text())
    return json({ ok: false, error: 'Could not send the message. Please try again later.' }, 502)
  }

  return json({ ok: true })
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/contact') {
      if (request.method === 'OPTIONS')
        return new Response(null, { status: 204, headers: CORS_HEADERS })

      if (request.method !== 'POST')
        return json({ ok: false, error: 'Method not allowed.' }, 405)

      try {
        return await handleContact(request, env)
      }
      catch (error) {
        console.error('Unexpected error in /api/contact', error)
        return json({ ok: false, error: 'Unexpected server error.' }, 500)
      }
    }

    // Everything else falls through to the static assets (the Vue SPA).
    if (env.ASSETS)
      return env.ASSETS.fetch(request)

    return new Response('Not found', { status: 404 })
  },
}
