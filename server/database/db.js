const mongoose = require("mongoose");

const URL = process.env.MONGO_URI;

const connect = () => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      (db) => {
        console.log("mongodb is connected succesfully to the server");
      },
      (err) => {
        console.log(err);
      }
    );
};

module.exports = connect;
