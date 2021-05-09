var express = require("express");
var router = express.Router();
const user = require("../controllers/user");
const investment = require("../controllers/investments");
const payment = require("../controllers/payment");

const auth = require("../middleware/auth");
const uplaod = require("../middleware/upload");
//const payment = require("../controllers/payment");

/* payment. */
// router.post("/pay", payment.start);
// router.post("/verify-payment", payment.verify);

//user routes
router.post("/signup", auth.register);
router.post("/login", auth.login);
router.get("/user/:id", auth.jwt, user.getUser);
router.get("users", auth.jwt, user.getAllUsers);
router.patch("/user/:id", auth.jwt, user.updateUser);
router.delete("/user", auth.jwt, user.deleteUser);
router.post("/forgot-password", user.forgotPassword);
router.post("/resetpassword/:token", user.resetPassword);
router.get("/verifytoken/:token", user.verifyToken);

//event routes
router.post("/package", auth.jwt, investment.create);
router.get("/admin-packages", auth.jwt, auth.admin, investment.adminGetAll);
router.get("/packages/:id", auth.jwt, investment.getAll);
router.get("/package/:id", investment.get);
router.patch("/package/:id", auth.jwt, investment.update);
router.put("/package/:id", auth.jwt, investment.togglePaid);
router.put("/complete/:id", auth.jwt, investment.toggleComplete);
router.delete("/package/:id", auth.jwt, investment.delete);

module.exports = router;
