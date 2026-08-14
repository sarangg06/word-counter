const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    word: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Word",
      required: true,
    },
    count: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

entrySchema.index({ word: 1, sessionId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Entry", entrySchema);
