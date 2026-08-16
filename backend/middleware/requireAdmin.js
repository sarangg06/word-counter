const jwt = require("jsonwebtoken");

function requireAdmin(req, res, next) {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json({ error: "Not Authenticated" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "ADMIN") throw new Error();
    next();
  } catch {
    res.status(401).json({ error: "Not Authenticated" });
  }
}

module.exports = requireAdmin;
