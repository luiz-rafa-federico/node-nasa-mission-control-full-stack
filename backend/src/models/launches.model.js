// const launches = new Map();

// as long we have launches stored in memory, and when we make a request,
// we never know which server we are talking to. So we need a database, an external
// place that is independent of the process.

const launches = require("./mongo/launches.mongo");
const axios = require("axios");
const {
  saveLaunch,
} = require("../routes/controllers/services/launches.services");

let DEFAULT_FLIGHT_NUMBER = 100;

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

// const launch = {
//   flightNumber: 100,
//   mission: "Kepler Exploration X",
//   rocket: "Explorer IS1",
//   launchDate: new Date("December 27, 2030"),
//   destination: "Kepler-442 b",
//   customers: ["ZTM", "NASA"],
//   upcoming: true,
//   success: true,
// };

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function populateLaunches() {
  try {
    const response = await axios.post(SPACEX_API_URL, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              customers: 1,
            },
          },
        ],
      },
    });

    const spaceXLaunchesData = response.data.docs;

    for (let launch of spaceXLaunchesData) {
      const payloads = launch["payloads"];
      const customers = payloads.flatMap((payload) => payload["customers"]);

      let launchData = {
        flightNumber: launch["flight_number"],
        mission: launch["name"],
        rocket: launch["rocket"]["name"],
        upcoming: launch["upcoming"],
        success: launch["success"],
        customers,
        launchDate: launch["date_local"],
      };

      saveLaunch(launchData);
    }
  } catch (err) {
    console.error(err);
  }
}

async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Launch SpaceX data already loaded!!");
    return;
  }

  await populateLaunches();
}

// launches.set(launch.flightNumber, launch);

module.exports = {
  getLatestFlightNumber,
  loadLaunchesData,
};
