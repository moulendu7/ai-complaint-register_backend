const userService = require("../services/user-service");
exports.registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser({
      ...req.body,
      role: "student",
    });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const user = await userService.registerUser({
      ...req.body,
      role: "admin",
    });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // 🔥 true on Render
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 🔥 cross-origin fix
};

exports.loginUser = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);

    if (result.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Not a user account",
      });
    }

    res.cookie("token", result.token, cookieOptions);

    res.json({
      success: true,
      user: result.user,
    });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);

    if (result.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not an admin account",
      });
    }

    res.cookie("token", result.token, cookieOptions);

    res.json({
      success: true,
      user: result.user,
    });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
exports.logout = (req, res) => {
  res.clearCookie("token", cookieOptions);

  res.json({
    success: true,
    message: "Logged out",
  });
};

exports.getMe = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};