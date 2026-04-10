const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* ================= MIDDLEWARES ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/data", require("./routes/data"));
app.use("/api/prediction", require("./routes/prediction"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/system-config", require("./routes/systemConfig")); // ✅ ADDED

/* ================= BASE ROUTE ================= */
app.get("/", (req, res) => {
  res.status(200).send("BizBrain Backend Running 🚀");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});