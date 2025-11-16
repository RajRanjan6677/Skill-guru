const express = require("express");
const router = express.Router();
const { getProgress, updateProgress } = require("../controllers/progress.controllers");

// ✅ GET route to read progress (hardcoded user ID)
router.get("/read", getProgress);

// ✅ POST or PUT route to update progress
router.post("/update", updateProgress);

module.exports = router;
