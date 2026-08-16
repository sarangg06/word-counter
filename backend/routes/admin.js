const express = require("express");
const router = express.Router();
const Word = require("../models/Word");
const requireAdmin = require("../middleware/requireAdmin");

router.use(requireAdmin);

router.get("/words/pending", async (req, res) => {
  const pending = await Word.find({ approved: false }).sort({ createdAt: -1 });
  res.json(pending);
});

router.patch("/words/:id/approve", async (req, res) => {
  const word = await Word.findByIdAndUpdate(
    req.params.id,
    { approved: true },
    { new: true },
  );
  if (!word) return res.status(404).json({ error: "Word not found" });
  res.json(word);
});

router.delete("/words/:id", async (req, res) => {
  await Word.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
