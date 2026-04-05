const mongoose = require("mongoose");

const DatasetSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  data: [
    {
      month: String,
      sales: Number,
      expense: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Dataset", DatasetSchema);
