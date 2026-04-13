const User = require("../models/user");

const createUser = async (data) => {
  return await User.create(data);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id).select("-password");
};

module.exports = {
  createUser,
  findByEmail,
  findById,
};