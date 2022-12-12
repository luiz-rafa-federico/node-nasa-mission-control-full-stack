// const launches = new Map();

// as long we have launches stored in memory, and when we make a request,
// we never know which server we are talking to. So we need a database, an external
// place that is independent of the process.

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// launches.set(launch.flightNumber, launch);

module.exports = {
  launch,
  latestFlightNumber,
};
