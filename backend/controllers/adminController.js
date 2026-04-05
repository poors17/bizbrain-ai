const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");

// ================= GET ALL USERS =================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.user.id === user._id.toString()) {
      return res.status(403).json({ message: "You cannot delete yourself" });
    }

    // ✅ ACTIVITY LOG (Correct Action)
    await ActivityLog.create({
      adminId: req.user._id,
      action: "Deleted user",
      targetUser: {
        id: user._id,
        username: user.name,
        email: user.email
      }
    });

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};

// ================= BLOCK / UNBLOCK =================
exports.updateStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.user.id === user._id.toString()) {
      return res.status(403).json({ message: "You cannot block yourself" });
    }

    user.status = req.body.status;
    await user.save();

    // ✅ ACTIVITY LOG (Fixed targetUser structure)
    await ActivityLog.create({
      adminId: req.user._id,
      action:
        user.status === "BLOCKED"
          ? "Blocked user"
          : "Unblocked user",
      targetUser: {
        id: user._id,
        username: user.name,
        email: user.email
      }
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Status update failed" });
  }
};