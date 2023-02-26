const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middleware/errorMiddleware");
const connection = require("./database/db");
require("dotenv").config();
const teacherRoute = require("./routes/teacherRoute");
const userRoute = require("./routes/userRoutes");
const agoraRoute = require("./routes/agoraRoute");
const paymentRoute = require("./routes/paymentRoute");
const questionRoute=require("./routes/ratingRoute");
// FOR PAYMENT GATWAY
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_35zy3Hqp4Jtv6M",
  key_secret: "0LDDihu5S8UgdBS4o6KvL4Fj",
});

const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("hello!!!!");
});

app.use("/teacher", teacherRoute);
app.use("/user", userRoute);
app.use("/agora", agoraRoute);
app.use("/payment", paymentRoute);
app.use("/ask",questionRoute);



app.use(errorMiddleware);

connection();

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
