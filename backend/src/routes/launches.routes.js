const express = require("express");

const {
  createLaunch,
  listLaunches,
} = require("./controllers/launches.controller");

const launchesRouter = express.Router({ mergeParams: true });

// launchesRouter.use((req, res, next) => {
//   console.log("IP ADDRESS =>", req.ip);
//   next();
// });

const launchesRoutes = () => {
  launchesRouter.post("/", createLaunch);
  launchesRouter.get("/", listLaunches);

  return launchesRouter;
};

module.exports = launchesRoutes;
