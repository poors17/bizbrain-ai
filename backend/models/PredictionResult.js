const mongoose = require("mongoose");

const algorithmSchema = new mongoose.Schema({
  sales: Number,
  expense: Number,
  profit: Number,
  accuracy: Number,
  confidence: Number
});

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    r2sp: algorithmSchema,
    iwpa: algorithmSchema,
    tmsa: algorithmSchema,
    rapa: algorithmSchema,
    bestAlgorithm: String,
    status: String   // ✅ ADD THIS
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PredictionResult",
  predictionSchema
);