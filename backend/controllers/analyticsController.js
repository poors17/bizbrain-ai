const User = require("../models/User");
const PredictionResult = require("../models/PredictionResult");
const ActivityLog = require("../models/ActivityLog");

exports.getAnalytics = async (req, res) => {
  try {
    const days = req.query.days; // 7 | 30 | all

    /* ================= USERS COUNT ================= */
    const totalUsers = await User.countDocuments({ role: "USER" });
    const totalAdmins = await User.countDocuments({ role: "ADMIN" });
    const activeUsers = await User.countDocuments({
      role: "USER",
      status: "ACTIVE"
    });

    /* ================= PREDICTIONS ================= */
    const totalPredictions = await PredictionResult.countDocuments();

    const avgConfidence = await PredictionResult.aggregate([
      { $group: { _id: null, avg: { $avg: "$confidence" } } }
    ]);

    const predictionAccuracy = avgConfidence.length
      ? Math.round(avgConfidence[0].avg)
      : 0;

    /* ================= DATE FILTER ================= */
    let matchStage = {};
    if (days && days !== "all") {
      const start = new Date();
      start.setDate(start.getDate() - Number(days));
      matchStage = { createdAt: { $gte: start } };
    }

    /* ================= USER GROWTH (USER ONLY) ================= */
    const dailyGrowth = await User.aggregate([
      {
        $match: {
          ...matchStage,
          role: "USER"
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    let runningTotal = 0;
    const userGrowth = dailyGrowth.map(d => {
      runningTotal += d.count;
      return {
        date: d._id,
        dailyUsers: d.count,
        totalUsers: runningTotal
      };
    });

    /* ================= PEAK DAY ================= */
    const peakDay = dailyGrowth.length
      ? dailyGrowth.reduce((max, d) =>
          d.count > max.count ? d : max
        )
      : null;

    /* ================= HEATMAP ================= */
    const heatmapData = dailyGrowth.map(d => {
      let level = "low";
      if (d.count >= 5) level = "high";
      else if (d.count >= 3) level = "medium";

      return {
        date: d._id,
        count: d.count,
        level
      };
    });

    /* ================= PREDICTION RESULTS ================= */
    const predictionResults = [
      {
        label: "High Confidence",
        value: await PredictionResult.countDocuments({
          confidence: { $gte: 70 }
        })
      },
      {
        label: "Medium Confidence",
        value: await PredictionResult.countDocuments({
          confidence: { $gte: 40, $lt: 70 }
        })
      },
      {
        label: "Low Confidence",
        value: await PredictionResult.countDocuments({
          confidence: { $lt: 40 }
        })
      }
    ];
    /* ================= ALGORITHM ANALYTICS ================= */

const predictions = await PredictionResult.find();

const algoStats = {
  r2sp: 0,
  iwpa: 0,
  tmsa: 0,
  rapa: 0
};

const totalAlgoPredictions = predictions.length;

predictions.forEach(p => {
  if (p.bestAlgorithm && algoStats.hasOwnProperty(p.bestAlgorithm)) {
    algoStats[p.bestAlgorithm]++;
  }
});

let mostUsedAlgorithm = null;

if (totalAlgoPredictions > 0) {
  mostUsedAlgorithm = Object.entries(algoStats)
    .sort((a, b) => b[1] - a[1])[0]; 
}

/* ================= SYSTEM HEALTH ================= */

// API health (if this runs, API is alive)
const apiStatus = true;

// Database health check
let dbStatus = true;
try {
  await User.findOne().limit(1);
} catch (err) {
  dbStatus = false;
}

// Prediction engine health
const predictionEngineStatus = totalPredictions > 0;

// Simple server load logic
let serverLoad = "Normal";
if (totalPredictions > 50) {
  serverLoad = "High";
} else if (totalPredictions > 20) {
  serverLoad = "Medium";
}

    /* ================= RECENT ACTIVITY ================= */
    const recentActivity = await ActivityLog.find()
      .populate("adminId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    /* ================= RESPONSE ================= */
    console.log("TOTAL ADMINS:", totalAdmins);
    
    res.set("Cache-Control", "no-store");

    /* ================= SECURITY ALERTS ================= */

const securityAlerts = await ActivityLog.find({
  action: "ACCOUNT_LOCKED"
})
  .sort({ createdAt: -1 })
  .limit(3);

  res.json({
    totalUsers,
    totalAdmins,
    activeUsers,
    totalPredictions,
    predictionAccuracy,
    userGrowth,
    peakDay,
    heatmapData,
    predictionResults,
    recentActivity,
    algorithmStats: algoStats,
    mostUsedAlgorithm,
    totalAlgoPredictions,
    securityAlerts,   // ⭐ ADD THIS
    systemHealth: {
    apiStatus,
    dbStatus,
    predictionEngineStatus,
    serverLoad
  }
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Analytics fetch failed" });
  }
}; 