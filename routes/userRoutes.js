const express = require("express");
const router = express.Router();

const userController = require("../controller/user-controller");
const authenticate = require("../auth/authenticate.js");

router.get("/me", authenticate, userController.getMe);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", authenticate, userController.logout)

module.exports = router;