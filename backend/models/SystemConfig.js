const mongoose = require("mongoose");

const systemConfigSchema = new mongoose.Schema({
  predictionMode: {
    type: String,
    enum: ["Basic", "Balanced", "Advanced"],
    default: "Balanced"
  },
  accuracyThreshold: {
    type: Number,
    default: 70
  },
  autoApprove: {
    type: Boolean,
    default: true
  },
  enabledAlgorithms: {
    r2sp: { type: Boolean, default: true },
    iwpa: { type: Boolean, default: true },
    tmsa: { type: Boolean, default: true },
    rapa: { type: Boolean, default: true }
  },
  minRows: { type: Number, default: 10 },
  maxFileSize: { type: Number, default: 5 },
  allowRegistration: { type: Boolean, default: true },
enablePrediction: { type: Boolean, default: true },
enableReports: { type: Boolean, default: true },
userApprovalRequired: { type: Boolean, default: false },

maxLoginAttempts: {
  type: Number,
  default: 5
},

accountLockHours: {
  type: Number,
  default: 24
}
});

module.exports = mongoose.model("SystemConfig", systemConfigSchema);