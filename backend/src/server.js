const http = require("http");
require("dotenv").config();
const { connectDB } = require("../src/database/connection.js");
const { loadLaunchesData } = require("./models/launches.model");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectDB();
  await loadPlanetsData();
  await loadLaunchesData();

  server.listen(PORT, () =>
    console.log(`Server is listening on http://localhost:${PORT}`)
  );
}
startServer();
