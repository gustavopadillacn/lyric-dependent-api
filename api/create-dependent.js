module.exports = async (req, res) => {
  const body = req.body;

  console.log("📩 Datos recibidos del formulario:", body);

  return res.status(200).json({
    success: true,
    message: "✅ Dependent received (mock response from Vercel)."
  });
};
