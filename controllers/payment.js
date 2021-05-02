const mongoose = require("mongoose");
require("../models/investment");
require("../models/payment");
const jwt = require("jsonwebtoken");

const Investment = mongoose.model("investment");
const Payment = mongoose.model("payment");

const payment = {
  pay: (req, res, next) => {
    const { amount, investmentId } = req.body;
    const payment = new Payment({
      title,
      event_type,
      description,
      venue,
      date,
      time,
      price,
      userId,
      image: req.file.filename,
    });
    payment
      .save()
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        console.log(data);
        res.json({ message: "success", data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  get: (req, res) => {
    User.findById(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAll: (req, res) => {
    User.find({})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  delete: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((data) => {
        console.log(data);
        res.send("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    })
      .then((data) => {
        console.log(data);
        res.send("Updated");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = payment;
