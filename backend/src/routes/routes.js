const planetsRoutes = require("./planets.routes");

const initializeRouter = (app) => {
  app.use("/planets", planetsRoutes());
};

module.exports = initializeRouter;
