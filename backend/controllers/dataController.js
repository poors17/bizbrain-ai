const Dataset = require("../models/Dataset");
const csv = require("csvtojson");
const xlsx = require("xlsx");
const fs = require("fs");

exports.uploadData = async (req, res) => {
  try {
    console.log("FILE RECEIVED:", req.file); // 🔍 DEBUG

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let parsedData = [];

    // CSV
    if (req.file.mimetype === "text/csv") {
      parsedData = await csv().fromFile(req.file.path);
    }

    // Excel
    else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      parsedData = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );
    }

    if (!parsedData || parsedData.length === 0) {
      return res.status(400).json({ message: "Dataset empty" });
    }

    // 🔥 SAVE FULL DATA
    const dataset = await Dataset.create({
      userId: req.user.id,
      data: parsedData
    });

    // 🔥 BASIC KPI CALCULATION
    let totalSales = 0;
    let totalExpense = 0;

    parsedData.forEach(row => {
      totalSales += Number(row.sales || 0);
      totalExpense += Number(row.expense || 0);
    });

    const prediction = {
      totalSales,
      totalExpense,
      profit: totalSales - totalExpense,
      confidence: Math.min(95, 60 + parsedData.length * 5)
    };

    // OPTIONAL: delete temp upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: "Dataset uploaded successfully",
      datasetId: dataset._id,
      prediction
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
