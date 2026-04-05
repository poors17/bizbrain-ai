const PredictionResult = require("../models/PredictionResult");
const SystemConfig = require("../models/SystemConfig");

exports.getReports = async (req, res) => {
  try {

    const config = await SystemConfig.findOne();

    if (config && !config.enableReports) {
      return res.status(403).json({
        message: "Report downloads are disabled by admin"
      });
    }

    const reports = await PredictionResult.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    /* ---------- CALCULATE ANALYTICS ---------- */

    const totalPredictions = reports.length;

    let totalAccuracy = 0;
    let totalProfit = 0;

    reports.forEach(r => {

      const algo = r.bestAlgorithm;
    
      if (r[algo]) {
        totalAccuracy += r[algo].accuracy || 0;
        totalProfit += r[algo].profit || 0;
      }
    
    });

    const avgAccuracy =
      totalPredictions > 0
        ? (totalAccuracy / totalPredictions).toFixed(2)
        : 0;

    const avgProfit =
      totalPredictions > 0
        ? (totalProfit / totalPredictions).toFixed(0)
        : 0;

    const bestAlgorithm =
      reports.length > 0 ? reports[0].bestAlgorithm : "—";

    /* ---------- RESPONSE ---------- */

    res.json({
      totalPredictions,
      avgAccuracy,
      avgProfit,
      bestAlgorithm,
      reports
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};