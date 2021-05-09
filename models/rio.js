const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    investment_id: { type: String, required: false },
    total: { type: Number, required: false },
  },
  { timestamps: true }
);

mongoose.model("payment", paymentSchema);
