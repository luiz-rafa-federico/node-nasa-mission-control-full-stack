const mongoose = require("mongoose");

async function connectDB() {
  const MONGO_URL =
    "mongodb+srv://nasa-luiz:z9PXGhYznKPgCnll@nasacluster0.g7psmyn.mongodb.net/?retryWrites=true&w=majority";

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
