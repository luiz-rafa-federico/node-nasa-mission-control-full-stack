const { getAllLaunches } = require("./services/launches.services");

const createLaunch = (req, res) => {};

const listLaunches = (req, res) => {
  const launches = getAllLaunches();

  res.status(200).json(launches);
};

module.exports = {
  createLaunch,
  listLaunches,
};
