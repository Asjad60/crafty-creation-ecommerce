const mongoose = require("mongoose");
require("dotenv").config();

const connectdb = async () => {
  try {
    let connect = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db connected successfully");
  } catch (err) {
    console.log("DB connecting issues");
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectdb;
