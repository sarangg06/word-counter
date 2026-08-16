const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!match) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const token = jwt.sign({ role: "ADMIN" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("adminToken", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  res.json({ message: "Logged in" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("adminToken");
  res.json({ message: "Logged out" });
});

module.exports = router;
