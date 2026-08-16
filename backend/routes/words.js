const express = require("express");
const router = express.Router();
const Word = require("../models/Word");
const Entry = require("../models/Entry");
const ensureSession = require("../middleware/session");
const { startOfDay } = require("../utils/dateHelpers");

// public list, approved words only
router.get("/", async (req, res) => {
  const words = await Word.find({ approved: true }).sort({ text: 1 });
  res.json(words);
});

// single word fetch
router.get("/:id", async (req, res) => {
  const word = await Word.findOne({ _id: req.params.id, approved: true });
  if (!word) return res.status(404).json({ error: "Word not found" });
  res.json(word);
});

// word proposal
router.post("/propose", async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const word = await Word.create({
      text: text.trim().toLowerCase(),
      approved: false,
    });
    return res
      .status(201)
      .json({ message: "Word Registered! Approval Pending.", word });
  } catch (err) {
    if (err.code == 11000) {
      return res
        .status(409)
        .json({ error: "That word has already been proposed/registered." });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
});

// submit or update 's count
router.post("/:id/entries", ensureSession, async (req, res) => {
  const { count } = req.body;
  if (typeof count !== "number" || count < 0) {
    return res
      .status(400)
      .json({ error: "Count must be a non-negative number" });
  }

  const word = await Word.findOne({ _id: req.params.id, approved: true });
  if (!word) return res.status(404).json({ error: "Word not found" });

  const entry = await Entry.findOneAndUpdate(
    { word: word._id, sessionId: req.sessionId, date: startOfDay() },
    { count },
    { upsert: true, new: true },
  );

  res.json(entry);
});

// daily average over time
router.get("/:id/stats", async (req, res) => {
  const stats = await Entry.aggregate([
    {
      $match: { word: new (require("mongoose").Types.ObjectId)(req.params.id) },
    },
    {
      $group: {
        _id: "$date",
        average: { $avg: "$count" },
        submissions: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        date: "$_id",
        average: { $round: ["$average", 2] },
        submissions: 1,
      },
    },
  ]);

  res.json(stats);
});

module.exports = router;
