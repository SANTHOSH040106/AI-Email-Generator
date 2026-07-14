const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    prompt: {
      type: String,
      required: true,
    },

    generatedEmail: {
      type: String,
      required: true,
    },

    tone: {
      type: String,
      enum: ["Professional", "Friendly", "Formal", "Casual"],
      default: "Professional",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Email", emailSchema);