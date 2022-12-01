const {
  getAllLaunches,
  addNewLaunch,
} = require("./services/launches.services");

const httpCreateLaunch = (req, res) => {
  const fields = ["mission", "rocket", "launchDate", "destination"];

  for (let field of Object.keys(req.body)) {
    if (!fields.includes(field)) {
      return res.status(400).json({
        error: `Fields must be ${fields}`,
      });
    }
  }

  const launch = req.body;

  if (
    !launch.mission ||
    !launch.destination ||
    !launch.rocket ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: "Required fields are missing",
    });
  }

  if (
    typeof launch.mission !== "string" ||
    typeof launch.destination !== "string" ||
    typeof launch.rocket !== "string"
  ) {
    return res.status(400).json({
      error: "Required fields must all be strings",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  /**
   * const notDate = new Date("hello")
   * notDate.valueOf() => NaN */

  // if (isNaN(launch.launchDate))
  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "Invalid Date",
    });
  }

  const response = addNewLaunch(launch);

  if (response) {
    return res.status(201).json({ launch, message: "Launch created" });
  } else {
    return res.status(400).json({ error: "Failed to create launch" });
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
