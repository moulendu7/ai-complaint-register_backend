const complaintService = require("../services/complaint-service");

exports.createComplaint = async (req, res) => {
  try {
    const complaint = await complaintService.createComplaint(
      req.user._id,
      req.body,
    );

    res.status(201).json({
      success: true,
      data: complaint,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await complaintService.getUserComplaints(req.user._id);

    res.json({
      success: true,
      data: complaints,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await complaintService.getAllComplaints();

    res.json({
      success: true,
      data: complaints,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const updated = await complaintService.updateComplaint(
      req.params.id,
      req.body,
    );

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await complaintService.getComplaintById(req.params.id);

    res.json({
      success: true,
      data: complaint,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
