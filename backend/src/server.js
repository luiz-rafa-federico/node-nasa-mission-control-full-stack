const http = require("http");
const { connectDB } = require("../src/database/connection.js");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectDB();
  await loadPlanetsData();

  server.listen(PORT, () =>
    console.log(`Server is listening on http://localhost:${PORT}`)
  );
}
startServer();
