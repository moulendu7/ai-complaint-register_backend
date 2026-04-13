require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const connect_db = require("../config/db-connect");

const seedAdmin = async () => {
  try {
    await connect_db();

    const existing = await User.findOne({ email: "admin@admin.com" });

    if (existing) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created:", admin.email);
    process.exit();

  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();