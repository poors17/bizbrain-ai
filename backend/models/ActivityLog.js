const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    action: {
      type: String,
      required: true
    },
    targetUser: {
      id: {
        type: mongoose.Schema.Types.ObjectId
      },
      username: {
        type: String
      },
      email: {
        type: String
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);