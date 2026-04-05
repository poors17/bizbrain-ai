const SystemConfig = require("../models/SystemConfig");

exports.getConfig = async (req, res) => {
  let config = await SystemConfig.findOne();
  if (!config) {
    config = await SystemConfig.create({});
  }
  res.json(config);
};

exports.updateConfig = async (req, res) => {
  const updated = await SystemConfig.findOneAndUpdate(
    {},
    req.body,
    { new: true, upsert: true }
  );
  res.json(updated);
};