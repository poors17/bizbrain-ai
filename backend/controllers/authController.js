const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");
const SystemConfig = require("../models/SystemConfig");
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const config = await SystemConfig.findOne();

const maxAttempts = config?.maxLoginAttempts || 5;
const lockHours = config?.accountLockHours || 24;

    // 🔐 Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔒 Pending approval
if (user.status === "PENDING") {
  return res.status(403).json({
    message: "Your account is awaiting admin approval"
  });
}

// 🔒 If account locked check
if (user.status === "BLOCKED") {

  if (user.lockUntil && user.lockUntil > Date.now()) {

    const remainingHours = Math.ceil(
      (user.lockUntil - Date.now()) / (1000 * 60 * 60)
    );

    return res.status(403).json({
      message: `Account locked. Try again after ${remainingHours} hour(s)`,
      lockUntil: user.lockUntil
    });
  }

  // unlock after lock time
  user.status = "ACTIVE";
  user.failedAttempts = 0;
  user.lockUntil = null;
  await user.save();
}

    // 🔑 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      user.failedAttempts += 1;

      const attemptsLeft = maxAttempts - user.failedAttempts;

      if (user.failedAttempts >= maxAttempts) {

        user.status = "BLOCKED";
        user.lockUntil = Date.now() + lockHours * 60 * 60 * 1000;

        await ActivityLog.create({
          adminId: null,
          action: "ACCOUNT_LOCKED",
          targetUser: {
            id: user._id,
            username: user.name,
            email: user.email
          }
        });

        await user.save();

        return res.status(403).json({
          message:
            `Account locked due to multiple failed login attempts. Contact admin@bizbrain.ai or wait ${lockHours} hours.`,
          lockUntil: user.lockUntil
        });
      }

      await user.save();

      return res.status(401).json({
        message: `Invalid password. ${attemptsLeft} attempt${attemptsLeft > 1 ? "s" : ""} remaining`
      });
    }

    // ✅ Reset attempts after successful login
    user.failedAttempts = 0;
    user.lockUntil = null;

    // ✅ Update login time
    user.lastLogin = new Date();

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      role: user.role,
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {

  try {

    const { email, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "BLOCKED" && user.lockUntil > Date.now()) {

      const remainingHours = Math.ceil(
        (user.lockUntil - Date.now()) / (1000 * 60 * 60)
      );

      return res.status(403).json({
        message: `Password reset disabled. Wait ${remainingHours} hour(s)`
      });

    }

    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
      return res.status(401).json({ message: "Current password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    user.failedAttempts = 0;
    user.lockUntil = null;
    user.status = "ACTIVE";

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Reset password failed" });
  }

};