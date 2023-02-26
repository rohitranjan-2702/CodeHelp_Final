const express = require("express");
const { login, register, getMe } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", protect, getMe);

module.exports = router;