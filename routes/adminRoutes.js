const express = require("express");
const router = express.Router();

const userController = require("../controller/user-controller");
const authenticate = require("../auth/authenticate");
const isAdmin = require("../auth/isadmin");

// router.post("/register", userController.registerAdmin);
router.post("/login", userController.loginAdmin);
router.post("/logout", authenticate, isAdmin, userController.logout);

module.exports = router;