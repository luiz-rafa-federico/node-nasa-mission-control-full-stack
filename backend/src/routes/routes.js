const planetsRoutes = require("./planets.routes");
const launchesRoutes = require("./launches.routes");

const API_VERSION = "v1";

const initializeRouter = (app) => {
  app.use(`/${API_VERSION}/planets`, planetsRoutes());
  app.use(`/${API_VERSION}/launches`, launchesRoutes());
};

module.exports = initializeRouter;
