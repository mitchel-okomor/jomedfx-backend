const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    userId: String,
    title: String,
    amount: String,
    isApproved: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

mongoose.model("investment", eventSchema);
