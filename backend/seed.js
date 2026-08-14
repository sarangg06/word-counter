// seed script for system sanity-check
require("dotenv").config();
const mongoose = require("mongoose");
const Word = require("./models/Word");
const Entry = require("./models/Entry");
const { startOfDay } = require("./utils/dateHelpers");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const word = await Word.findOneAndUpdate(
    { text: "need to required to" },
    { text: "need to required to", approved: true },
    { upsert: true, new: true },
  );

  await Entry.create({
    word: word._id,
    count: 12,
    date: startOfDay(),
    sessionId: "test-session-1",
  });

  console.log("Seeded word:", word);
  process.exit(0);
}

seed();
