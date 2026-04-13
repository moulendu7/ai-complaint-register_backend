const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const complaintRoutes = require("./complaintRoutes");

router.use("/complaint", complaintRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

module.exports = router;