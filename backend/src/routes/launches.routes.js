const express = require("express");

const {
  httpCreateLaunch,
  httpListLaunches,
  httpDeleteLaunch,
} = require("./controllers/launches.controller");

const launchesRouter = express.Router({ mergeParams: true });

// launchesRouter.use((req, res, next) => {
//   console.log("IP ADDRESS =>", req.ip);
//   next();
// });

const launchesRoutes = () => {
  launchesRouter.post("/", httpCreateLaunch);
  launchesRouter.get("/", httpListLaunches);
  launchesRouter.delete("/:flightNumber", httpDeleteLaunch);

  return launchesRouter;
};

module.exports = launchesRoutes;
