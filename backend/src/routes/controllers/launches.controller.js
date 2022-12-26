const { getPagination } = require("../../database/query");
const {
  getAllLaunches,
  scheduleLaunch,
  abortLaunch,
} = require("./services/launches.services");

const httpCreateLaunch = async (req, res) => {
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
      error: "Required mission, destination, and rocket fields must be strings",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  /**
   * const notDate = new Date("hello")
   * notDate.valueOf() => NaN */

  // if (launch.launchDate.toString() === "Invalid Date")
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Date",
    });
  }

  const newLaunch = await scheduleLaunch(launch);

  if (newLaunch) {
    return res.status(201).json(newLaunch);
  } else {
    return res.status(400).json({ error: "Failed to create launch" });
  }
};

const httpListLaunches = async (req, res) => {
  const { limit, page } = req.query;

  const pagination = getPagination(limit, page);

  const launches = await getAllLaunches(pagination);

  return res.status(200).json(launches);
};

const httpAbortLaunch = async (req, res) => {
  const { flightNumber } = req.params;

  if (!flightNumber) {
    return res.status(400).json({ error: "Missing Flight Number" });
  }

  const abortedMission = await abortLaunch(Number(flightNumber));

  if (!abortedMission) {
    return res.status(400).json({ error: "Failed to abort launch" });
  }

  return res.status(200).json({
    message: `Mission ${abortedMission.flightNumber} has been successfully aborted`,
  });
};

module.exports = {
  httpCreateLaunch,
  httpListLaunches,
  httpAbortLaunch,
};
