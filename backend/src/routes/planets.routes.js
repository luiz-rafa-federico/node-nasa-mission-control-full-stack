const express = require("express");

const { listPlanets } = require("./controllers/planets.controller");

const planetsRouter = express.Router({ mergeParams: true });

planetsRouter.use((req, res, next) => {
  console.log("IP ADDRESS =>", req.ip);
  next();
});

const planetsRoutes = () => {
  planetsRouter.get("/", listPlanets);

  return planetsRouter;
};

module.exports = planetsRoutes;
