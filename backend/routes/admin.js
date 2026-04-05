const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getAllUsers,
  deleteUser,
  updateStatus
} = require("../controllers/adminController");

const { getAnalytics } = require("../controllers/analyticsController");

/* ================= USER MANAGEMENT ================= */
router.get("/users", auth, getAllUsers);
router.delete("/users/:id", auth, deleteUser);
router.put("/users/:id/status", auth, updateStatus);

/* ================= ANALYTICS ================= */
router.get("/analytics", auth, getAnalytics);

module.exports = router;
