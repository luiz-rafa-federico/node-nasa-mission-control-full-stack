const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  const MONGO_URL = process.env.MONGO_URL;

  mongoose.connection.once("open", () =>
    console.log("MongoDB connection ready!")
  );

  mongoose.connection.on("error", (err) => console.error(err));

  mongoose.set("strictQuery", true);

  await mongoose.connect(MONGO_URL);
}

async function disconnectDB() {
  await mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
