const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const helper = require("../services/helper");
const bcrypt = require("bcrypt-nodejs");
require("../models/user");

const User = mongoose.model("user");

const user = {
  getUser: (req, res) => {
    User.findById(
      req.params.id,
      "fullname account_name account_number bank date_of_birth email password phone occupation address next_of_kin next_of_kin_phone"
    )
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
      fullname: req.body.fullname,
      phone: req.body.phone,
      address: req.body.address,
      next_of_kin: req.body.next_of_kin,
      next_of_kin_phone: req.body.next_of_kin_phone,
      date_of_birth: req.body.date_of_birth,
      occupation: req.body.occupation,
      bank: req.body.bank,
      account_number: req.body.account_number,
      account_name: req.body.account_name,
    })
      .then((data) => {
        console.log(data);
        res.send("Updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  forgotPassword: (req, res) => {
    const user = User.find({ email: req.body.email })
      .then((data) => {
        const user = data[0];
        if (user) {
          let token = jwt.sign({ user: user._id }, "shhhhh", {
            expiresIn: 60 * 60,
          });
          let url = `https://jomedfx.netlify.app/auth/resetpassword/${token}`;
          let html = `click or copy and paste this link on your browser to change password<a href="${url}"> ${url}</a>`;

          helper.sendmail(user.email, token, html);
          res.status(200).json({
            status: "success",
            message: "check your email for confirmation",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No user found",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // try {
    //   user.getByEmail(req.body.email, (user) => {

    //     if (user) {
    //       let token = jwt.sign({ user: user.user_id }, 'shhhhh',{ expiresIn: 60 * 60 });
    //     let url = `http://localhost:3000/resetpassword/${token}`;
    //       let html = `please click on this link to change password<a href="${url}"> ${url}</a>`;

    //     helper.sendmail(user.email, token, html);
    //       res.status(200).json({
    //         status: "success",
    //         message: "check your email for confirmation",
    //       });
    //     } else {
    //       res.status(501).json({
    //         status: "error",
    //         message: "No user found",
    //       });
    //     }
    //   });
    // } catch (err) {
    //     console.log(err);
    // }
  },

  verifyToken: (req, res) => {
    console.log("verify token");
    helper.verifyToken(req.params.token, (err, result) => {
      if (err) {
        res.status(401).json({
          status: "error",
          message: "invalid or expired token",
          valid: false,
        });
      } else {
        console.log(result);
        res.status(200).json({
          status: "success",
          valid: true,
        });
      }
    });
  },

  resetPassword: (req, res) => {
    helper.verifyToken(req.params.token, (err, result) => {
      if (err) {
        res.status(400).json({
          status: "error",
          message: "Invalid or expeired token",
        });
      } else {
        //hash password with bcrypt-nodejs
        let salt = bcrypt.genSaltSync(10);
        console.log("password: " + req.body.password);
        bcrypt.hash(req.body.password, salt, null, (error, hash) => {
          if (error) {
            console.log(error);
          }

          //get all user information, password has already been declared in function parameters and will be hashed below

          let password = hash;

          User.findByIdAndUpdate(result.user, {
            password,
          })
            .then((data) => {
              console.log(data);
              res.status(200).json({
                status: "success",
                message: "Password changed successfully, procced to login",
              });
            })
            .catch((err) => {
              console.log(err);
              res.send("Operation failed");
            });
        });
      }
    });
  },
};

module.exports = user;
