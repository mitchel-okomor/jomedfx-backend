const mongoose = require("mongoose");
require("../models/user");

const User = mongoose.model("user");

const user = {
  getUser: (req, res) => {
    User.findById(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAllUsers: (req, res) => {
    User.find({})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deleteUser: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((data) => {
        console.log(data);
        res.send("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateUser: (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      phone: req.body.phone,
      next_of_kin: req.body.next_of_kin,
      next_of_kin_phone: req.body.next_of_kin_phone,
      date_of_birth: req.body.date_of_birth,
      bank: req.body.bank,
      account_number: req.body.account_number,
      account_name: req.body.account_name,
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

module.exports = user;
