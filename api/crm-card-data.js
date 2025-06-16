// /api/crm-card-data.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { objectId } = req.body;

  if (!objectId) {
    return res.status(400).json({ error: 'Missing objectId' });
  }

  // Devuelve una estructura ficticia para probar que funciona
  return res.status(200).json({
    card: {
      title: "Dependent Card Loaded",
      description: `This is a test card for object ID: ${objectId}`,
      fields: [
        { label: "Dependent Name", value: "Test Dependent" },
        { label: "Status", value: "Mocked OK" }
      ]
    }
  });
}
