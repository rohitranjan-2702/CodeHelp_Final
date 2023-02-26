const express = require("express");
const protect2 = require("../middleware/authMiddleware");
const {registerTeacher,loginTeacher,getTeacher} = require("../controllers/tutorController");


const router = express.Router();

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.get("/profile", protect2, getTeacher);

module.exports = router;