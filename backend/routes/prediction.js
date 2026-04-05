const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const predictionController = require("../controllers/predictionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  predictionController.runPrediction
);

module.exports = router;