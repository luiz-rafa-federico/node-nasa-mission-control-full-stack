const { getAllLaunches } = require("./services/launches.services");

const httpCreateLaunch = (req, res) => {};

const httpListLaunches = (req, res) => {
  const launches = getAllLaunches();

  res.status(200).json(launches);
};

module.exports = {
  httpCreateLaunch,
  httpListLaunches,
};
