const mongoose = require("mongoose");
require("../models/rio");

const Rio = mongoose.model("rio");

const payment = {
  pay: (req, res, next) => {
    const { amount, investmentId } = req.body;
    const payment = new Rio({
      investmentId,
      amount,
    });
    Rio.save()
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
    Rio.findById(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAll: (req, res) => {
    Rio.find({})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  delete: (req, res) => {
    Rio.findByIdAndRemove(req.params.id)
      .then((data) => {
        console.log(data);
        res.send("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  update: (req, res) => {
    Rio.findByIdAndUpdate(req.params.id, {
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
