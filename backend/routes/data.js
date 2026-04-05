const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const dataController = require("../controllers/dataController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  dataController.uploadData
);

module.exports = router;