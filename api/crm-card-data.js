export default async function handler(req, res) {
  const { objectId } = req.body;

  // 🔒 Esto es lo que activa el botón "Create Dependent"
  res.status(200).json({
    title: "Add Dependent",
    actions: [
      {
        type: "ACTION_HOOK",
        text: "Create Dependent",
        httpMethod: "POST",
        uri: "https://lyric-dependent-api.vercel.app/api/create-dependent",
        associatedObjectProperties: [
          "firstname", "lastname", "dob", "gender", "email",
          "address", "address2", "city", "zipcode",
          "state_id", "timezone_id", "primaryexternalid",
          "dependentexternalid", "relationshipid", "primaryphone"
        ]
      }
    ]
  });
}
