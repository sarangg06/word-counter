const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Word", wordSchema);
