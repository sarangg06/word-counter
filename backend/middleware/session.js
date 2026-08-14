const crypto = require("crypto");

function ensureSession(req, res, next) {
  let sessionId = req.cookies.sessionId;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  req.sessionId = sessionId;
  next();
}

module.exports = ensureSession;
