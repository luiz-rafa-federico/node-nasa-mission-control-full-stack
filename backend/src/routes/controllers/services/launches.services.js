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

const abortLaunch = (flightNumber) => {
  const launchToBeAborted = launches.get(flightNumber);

  if (launchToBeAborted) {
    // launches.delete(flightNumber);
    launchToBeAborted.upcoming = false;
    launchToBeAborted.success = false;
    return launchToBeAborted;
  } else {
    return false;
  }
};

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
