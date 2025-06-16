const axios = require('axios');
const FormData = require('form-data');

module.exports = async (req, res) => {
  const input = req.body;

  // 🔐 Login admin credentials (usa secretos si es posible)
  const loginEmail = process.env.LYRIC_ADMIN_EMAIL || 'MTMSTGREMOTE01@mytelemedicine.com';
  const loginPassword = process.env.LYRIC_ADMIN_PASSWORD || 'ZSO1vjn8cA@@vCGQYqB$';

  try {
    console.log("🔐 Logging into Lyric...");
    const loginResponse = await axios.post('https://staging.getlyric.com/go/api/login', null, {
      params: {
        email: loginEmail,
        password: loginPassword
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const bearerToken = loginResponse.headers.authorization;
    if (!bearerToken) {
      throw new Error("No Bearer token returned from Lyric login.");
    }

    console.log("✅ Logged in. Bearer token obtained.");

    // 🧱 Create form-data body for Lyric
    const form = new FormData();
    form.append('primaryExternalId', input.primaryexternalid);
    form.append('dependentExternalId', input.dependentexternalid);
    form.append('groupCode', 'MTMSTGREMOTE01');
    form.append('planId', '2446');

    form.append('firstname', input.firstname);
    form.append('lastname', input.lastname);
    form.append('dob', input.date_of_birth); // mm/dd/yyyy
    form.append('gender', input.gender);
    form.append('primaryPhone', input.primaryphone || '');
    form.append('email', input.email);

    form.append('address', input.address || '');
    form.append('address2', input.address2 || '');
    form.append('city', input.city);
    form.append('stateId', input.state_id);       // ID numérico
    form.append('timezoneId', input.timezone_id); // ID numérico
    form.append('zipCode', input.zipcode);
    form.append('relationShipId', input.relationshipid); // ID numérico

    // (Opcionales si los querés luego)
    // form.append('sendRegistrationNotification', 'true');
    // form.append('language', 'en');
    // form.append('effectiveDate', '06/16/2025');

    console.log("📤 Sending data to Lyric...");

    const response = await axios.post(
      'https://staging.getlyric.com/go/api/census/createMemberDependent',
      form,
      {
        headers: {
          Authorization: bearerToken,
          ...form.getHeaders()
        }
      }
    );

    console.log("✅ Dependent created in Lyric:", response.data);
    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    console.error("❌ Error creating dependent:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      error: err.response?.data || err.message
    });
  }
};

