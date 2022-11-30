const express = require("express");

const { httpListPlanets } = require("./controllers/planets.controller");

const planetsRouter = express.Router({ mergeParams: true });

// planetsRouter.use((req, res, next) => {
//   console.log("IP ADDRESS =>", req.ip);
//   next();
// });

const planetsRoutes = () => {
  planetsRouter.get("/", httpListPlanets);

  return planetsRouter;
};

module.exports = planetsRoutes;
