export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing code from HubSpot' });
  }

  try {
    const tokenResponse = await fetch('https://api.hubapi.com/oauth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.HUBSPOT_CLIENT_ID,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET,
        redirect_uri: 'https://lyric-dependent-api.vercel.app/api/oauth/callback',
        code,
      }),
    });

    const data = await tokenResponse.json();

    // 👉 En lugar de solo devolver un JSON, redirigimos a una página final
    return res.redirect(302, 'https://app.hubspot.com/contacts'); // o poné tu cuenta de pruebas
  } catch (err) {
    return res.status(500).json({ error: 'OAuth failed', details: err.message });
  }
}
