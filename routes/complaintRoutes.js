const express = require("express");
const router = express.Router();

const complaintController = require("../controller/complaint-controller");
const authenticate = require("../auth/authenticate");
const isAdmin = require("../auth/isadmin.js");


router.post("/", authenticate, complaintController.createComplaint);

router.get("/my", authenticate, complaintController.getUserComplaints);


router.get("/all", authenticate, isAdmin, complaintController.getAllComplaints);

router.put("/:id", authenticate, isAdmin, complaintController.updateComplaint);


module.exports = router;