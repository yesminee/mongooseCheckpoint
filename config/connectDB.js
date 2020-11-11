const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
  mongoose
    .connect(config.get("MONGO_URI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database connection successful"))
    .catch((err) => console.log("Database connection failed"));
};

module.exports = connectDB;
