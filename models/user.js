const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: String,
  email: { type: String, index: true, unique: true, required: true },
  next_of_kin: String,
  next_of_kin_phone: String,
  date_of_birth: String,
  Occupation: String,
  bank: String,
  account_number: String,
  account_name: String,
  role: { type: Number, default: 111 },
  password: { type: String, required: true },
  referal_id: String,
  user_id: String,
});

mongoose.model("user", userSchema);
