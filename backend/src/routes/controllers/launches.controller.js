const {
  getAllLaunches,
  addNewLaunch,
} = require("./services/launches.services");

const httpCreateLaunch = (req, res) => {
  // try catch block to verify type, empty fields, etc
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);

  const response = addNewLaunch(launch);

  if (response) {
    return res.status(201).json({ launch, message: "Launch created" });
  } else {
    return res.status(403).json({ error: "Failed to create launch" });
  }
};

const httpListLaunches = (req, res) => {
  const launches = getAllLaunches();

  return res.status(200).json(launches);
};

module.exports = {
  httpCreateLaunch,
  httpListLaunches,
};
