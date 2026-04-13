const Complaint = require("../models/complaint");

const createComplaint = async (data) => {
  return await Complaint.create(data);
};

const getByUser = async (userId) => {
  return await Complaint.find({ user: userId }).sort({ createdAt: -1 });
};

const getAll = async () => {
  return await Complaint.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

const getById = async (id) => {
  return await Complaint.findById(id);
};

const updateComplaint = async (id, data) => {
  return await Complaint.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  createComplaint,
  getByUser,
  getAll,
  getById,
  updateComplaint,
};