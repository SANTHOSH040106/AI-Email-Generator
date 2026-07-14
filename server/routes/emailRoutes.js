const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateAIEmail,
  getHistory,
  deleteEmail,
} = require("../controllers/emailController");

// Generate AI Email
router.post("/generate", protect, generateAIEmail);

// Get Email History
router.get("/history", protect, getHistory);

// Delete Email
router.delete("/:id", protect, deleteEmail);

module.exports = router;