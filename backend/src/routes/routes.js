const planetsRoutes = require("./planets.routes");
const launchesRoutes = require("./launches.routes");

const initializeRouter = (app) => {
  app.use("/planets", planetsRoutes());
  app.use("/launches", launchesRoutes());
};

module.exports = initializeRouter;
