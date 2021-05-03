const passport = require("./passport");

const auth = {
  //register a user
  register: (req, res, next) => {
    passport.authenticate(
      "register",
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          console.log(info);
          res.status(501).send("User already exist");
        } else {
          res.status(200).send(info);
        }
      }
    )(req, res, next);
  },

  //login user
  login: (req, res, next) => {
    passport.authenticate(
      "login",
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          console.log("login No user: " + user);
          res.status(401).send(info);
        } else {
          const { status, message, data, token } = info;
          res.status(200).send({ status, message, data, token });
        }
      }
    )(req, res, next);
  },

  //verify token in header
  jwt: (req, res, next) => {
    passport.authenticate(
      "jwt",
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401).send(info);
        } else {
          next();
        }
      }
    )(req, res, next);
  },
  //verify token in header
  admin: (req, res, next) => {
    console.log(req.headers);
    passport.authenticate(
      "admin",
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401).send(info);
        } else {
          next();
        }
      }
    )(req, res, next);
  },
};
module.exports = auth;
