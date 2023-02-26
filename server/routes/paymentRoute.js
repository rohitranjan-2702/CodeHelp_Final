const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  verifyPaymentDetails,
  performPayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/razorpay", performPayment);
router.post("/verification",  verifyPaymentDetails);


module.exports = router;
