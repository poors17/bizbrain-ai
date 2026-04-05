const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, 
    performedBy: {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
      role: String,
    },
    targetUser: {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
      email: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
