const express = require("express");
const router = express.Router();
const SystemConfig = require("../models/SystemConfig");

// GET config
router.get("/", async (req, res) => {
  try {
    let config = await SystemConfig.findOne();
    if (!config) {
      config = await SystemConfig.create({});
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE config
router.put("/", async (req, res) => {
  try {
    const updated = await SystemConfig.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;