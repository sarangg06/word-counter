// seed script for system sanity-check cum date modifier
require("dotenv").config();
const mongoose = require("mongoose");
const Word = require("./models/Word");
const Entry = require("./models/Entry");
const { startOfDay } = require("./utils/dateHelpers");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const word = await Word.findOne({ text: "need to required to" });

  await Entry.create({
    word: word._id,
    count: 25,
    date: startOfDay("2026-07-22"), // modify the date from here to enter custom entries
    sessionId: "test-session-1",
  });

  console.log("Seeded word:", word);
  process.exit(0);
}

seed();
