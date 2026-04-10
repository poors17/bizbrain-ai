const express = require("express");
const router = express.Router();

const { loginUser, resetPassword } = require("../controllers/authController");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const SystemConfig = require("../models/SystemConfig");
const ActivityLog = require("../models/ActivityLog");

/* ============ REGISTER ============ */
router.post("/register", async (req, res) => {

  const { name, email, password, role } = req.body;

  try {

    const config = await SystemConfig.findOne() || {};

    if (config && config.allowRegistration === false) {
      return res.status(403).json({
        message: "Registration is closed"
      });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be 6+ characters" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "USER",
      status: config?.userApprovalRequired ? "PENDING" : "ACTIVE"
    });

    await newUser.save();

    await ActivityLog.create({
  action: "USER_REGISTERED",
  targetUser: {
    id: newUser._id,
    username: newUser.name,
    email: newUser.email
  }
});
    
    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

});

/* ============ LOGIN ============ */

router.post("/login", loginUser);

/* ============ RESET PASSWORD ============ */

router.post("/reset-password", resetPassword);

module.exports = router;