const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

require("../models/user");

const User = mongoose.model("user");

const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;

//register a user
passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.find({ email: req.body.email }).then((err, user) => {
        if (user) {
          return done("User already exist", null);
        }
      });
      //hash password with bcrypt-nodejs
      let salt = bcrypt.genSaltSync(10);
      bcrypt.hash(req.body.password, salt, null, (error, hash) => {
        if (error) {
          console.log(error);
        }
        //generateId
        const generateID = () => {
          const letters = "0123456789abcdefghijklmnopqrstuvwxyz";
          let id = "J-";
          for (let i = 0; i < 6; i++) {
            id += letters[Math.floor(Math.random() * 26)];
          }
          return id;
        };
        //get all user information, password has already been declared in function parameters and will be hashed below
        const fullname = req.body.fullname.trim();
        const phone = req.body.phone.trim();
        const email = req.body.email.trim();
        const address = req.body.address.trim();
        const next_of_kin = req.body.next_of_kin.trim();
        const next_of_kin_phone = req.body.next_of_kin_phone;
        const date_of_birth = req.body.date_of_birth;
        const bank = req.body.bank;
        const occupation = req.body.occupation;
        const account_number = req.body.account_number;
        const account_name = req.body.account_name;
        const role = req.body.role;
        const referal_id = req.body.referal_id;
        let password = hash;

        //create new user

        const newUser = new User({
          fullname,
          phone,
          email,
          address,
          next_of_kin,
          next_of_kin_phone,
          date_of_birth,
          occupation,
          bank,
          account_number,
          account_name,
          role,
          password,
          referal_id,
        });
        newUser
          .save()
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "user not registered" });
            }
            if (user) {
              //prepare user info for res
              const data = {
                fullname,
                role: user.role,
                id: user._id,
              };

              //sign token for user
              const token = jwt.sign(
                {
                  userId: user.id,
                },
                process.env.SECRET,
                { expiresIn: "12h" }
              );

              //send to user
              return done(null, user, {
                status: "success",
                message: "user successfully created",
                data,
                token,
              });
            }
            return done(null, user);
          })
          .catch((err) => {
            // console.log(err);
            return done(err, null, null);
          });
      });
    }
  )
);

//login a user
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      console.log("Strategy " + username);

      User.findOne({ email: username }, {}).then((user) => {
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        } else {
          //compare user imputed password with database password
          bcrypt.compare(password, user.password, (error, valid) => {
            if (error) {
            } else if (!password || !valid) {
              return done(null, false, {
                status: "error",
                message: "Login failed",
              });
            } else {
              console.log(user);
              const token = jwt.sign(
                {
                  userId: user.id,
                  role: user.role,
                },
                process.env.SECRET,
                { expiresIn: "12h" }
              );
              const data = {
                fullname: user.fullname,
                role: user.role,
                id: user._id,
              };
              return done(null, user, {
                status: "success",
                message: "login successful",
                data,
                token,
              });
            }
          });
        }
      });
    }
  )
);

//verify a user token
const opts = {
  jwtFromRequest: ExtractJWT.fromHeader("authorization"),
  secretOrKey: process.env.SECRET,
};
passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      //Pass the user details to the next middleware
      return done(null, jwt_payload.userId);
    } catch (error) {
      done(error, false);
    }
  })
);

//verify a user token for admin

passport.use(
  "admin",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      console.log("JWT passport admin: " + JSON.stringify(jwt_payload));
      //Pass the user details to the next middleware
      const isAdmin = jwt_payload.role === 111;
      return done(null, isAdmin);
    } catch (error) {
      done(error, false);
    }
  })
);
module.exports = passport;
