let {
  launches,
  latestFlightNumber,
} = require("../../../models/launches.model");

const getAllLaunches = () => {
  // for (const value of launches.values()) {}
  return Array.from(launches.values());
};

const addNewLaunch = (launch) => {
  latestFlightNumber++;

  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["Zero To Mastery", "NASA"],
      upcoming: true,
      success: true,
    })
  );

  return launches;
};

module.exports = {
  getAllLaunches,
  addNewLaunch,
};
