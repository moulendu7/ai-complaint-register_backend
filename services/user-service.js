const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repository/user-repo");

const registerUser = async (data) => {
  const { name, email, password, role } = data;

  const existing = await userRepo.findByEmail(email);
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepo.createUser({
    name,
    email,
    password: hashedPassword,
    role: role || "student",
  });

  return user;
};

const loginUser = async (data) => {
  const { email, password } = data;

  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user,
  };
};

const getUserProfile = async (userId) => {
  return await userRepo.findById(userId);
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};