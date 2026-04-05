const csv = require("csvtojson");
const PredictionResult = require("../models/PredictionResult");
const SystemConfig = require("../models/SystemConfig");   // ✅ ADD THIS

const { r2spPredict } = require("../algorithms/r2sp");
const { iwpaPredict } = require("../algorithms/iwpa");
const { tmsaPredict } = require("../algorithms/tmsa");
const { rapaPredict } = require("../algorithms/rapa");


exports.runPrediction = async (req, res) => {
  try {
    const config = await SystemConfig.findOne();

    if (config && !config.enablePrediction) {
      return res.status(403).json({
        message: "Prediction module is disabled by admin"
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "CSV file required" });
    }

    const rows = await csv().fromFile(req.file.path);

    if (rows.length < 4) {
      return res.status(400).json({
        message: "Minimum 4 rows required"
      });
    }

    const results = {
      r2sp: r2spPredict(rows),
      iwpa: iwpaPredict(rows),
      tmsa: tmsaPredict(rows),
      rapa: rapaPredict(rows)
    };
    
    console.log("R2SP:", results.r2sp);
    console.log("IWPA:", results.iwpa);
    console.log("TMSA:", results.tmsa);
    console.log("RAPA:", results.rapa);

    const validResults = Object.keys(results).filter(
      key => results[key] && typeof results[key].accuracy === "number"
    );
    
    if (validResults.length === 0) {
      return res.status(500).json({
        message: "No valid prediction results"
      });
    }
    
    const best = validResults.reduce((a, b) =>
      results[a].accuracy >= results[b].accuracy ? a : b
    );
    const threshold = config?.accuracyThreshold ?? 70;
    const finalAccuracy = results[best]?.accuracy ?? 0;

    let status = finalAccuracy >= threshold
      ? "Approved"
      : "Low Confidence";

      const dataToSave = {
        ...results,
        bestAlgorithm: best,
        status
      };
      
      if (req.user && req.user._id) {
        dataToSave.user = req.user._id;
      }
      
      const savedResult = await PredictionResult.create(dataToSave);

    res.json(savedResult);

  } catch (err) {
    console.error("🔥 PREDICTION ERROR:", err);
    res.status(500).json({
      message: "Prediction failed",
      error: err.message
    });
  }
};