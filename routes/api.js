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
router.patch("/user", auth.jwt, user.updateUser);
router.delete("/user", auth.jwt, user.deleteUser);

//event routes
router.post("/package", auth.jwt, investment.create);
router.get("/packages/:id", auth.jwt, investment.getAll);
router.get("/package/:id", investment.get);
router.patch("/package/:id", auth.jwt, investment.update);
router.put("/publish/:id", auth.jwt, investment.togglePublish);
router.put("/complete/:id", auth.jwt, investment.toggleComplete);
router.delete("/package/:id", auth.jwt, investment.delete);

module.exports = router;
