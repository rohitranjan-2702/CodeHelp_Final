const expressAsyncHandler = require("express-async-handler");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const crypto = require("crypto");


const razorpay = new Razorpay({
  key_id: "rzp_test_35zy3Hqp4Jtv6M",
  key_secret: "0LDDihu5S8UgdBS4o6KvL4Fj",
});
// @desc : register new user
// @route: POST /users/register
// @access: public
const verifyPaymentDetails = expressAsyncHandler(async (req, res) => {
  // do a validation
  const secret = "12345678";

  console.log(req.body);


  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

const performPayment = expressAsyncHandler(async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  performPayment,
  verifyPaymentDetails,
};
