const express = require("express");
const protect = require("../middleware/authMiddleware");
const { getCallCredentials } = require("../controllers/agoraController");

const router = express.Router();

router.post("/CallCredentials", protect, getCallCredentials);

module.exports = router;
