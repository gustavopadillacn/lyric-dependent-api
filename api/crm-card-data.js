module.exports = async (req, res) => {
  const { objectId } = req.body;

  // 🔍 Este objectId es el ID del contacto actual en HubSpot
  console.log("🔍 CRM Card loaded for contact ID:", objectId);

  res.json({
    title: "Add Dependent",
    actions: [
      {
        type: "FORM",
        text: "Create Dependent",
        associatedObjectProperties: [
          "firstname",
          "lastname",
          "email",
          "date_of_birth",
          "gender",
          "dependentexternalid",
          "relationshipid",
          "primaryphone",
          "address",
          "address2",
          "city",
          "state_id",
          "timezone_id",
          "zipcode"
        ],
        inputs: [
          { type: "text", name: "firstname", label: "First Name" },
          { type: "text", name: "lastname", label: "Last Name" },
          { type: "text", name: "email", label: "Email" },
          { type: "date", name: "date_of_birth", label: "Date of Birth" },
          {
            type: "select",
            name: "gender",
            label: "Gender",
            options: [
              { label: "Male", value: "M" },
              { label: "Female", value: "F" }
            ]
          },
          {
            type: "select",
            name: "relationshipid",
            label: "Relationship",
            options: [
              { label: "Spouse", value: "1" },
              { label: "Child", value: "2" }
            ]
          },
          { type: "text", name: "dependentexternalid", label: "Dependent External ID" },
          { type: "text", name: "primaryphone", label: "Phone" },
          { type: "text", name: "address", label: "Address" },
          { type: "text", name: "address2", label: "Address 2" },
          { type: "text", name: "city", label: "City" },
          { type: "text", name: "state_id", label: "State ID" },
          { type: "text", name: "timezone_id", label: "Timezone ID" },
          { type: "text", name: "zipcode", label: "Zip Code" }
        ],
        targetUrl: "https://lyric-dependent-api.vercel.app/api/create-dependent"
      }
    ]
  });
};
