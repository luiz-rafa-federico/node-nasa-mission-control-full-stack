const launches = require("../../../models/mongo/launches.mongo");
const planets = require("../../../models/mongo/planets.mongo");

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

const getAllLaunches = async (pagination) => {
  // for (const value of launches.values()) {}
  // return Array.from(launches.values());

  const { skip, docsLimit } = pagination;

  return await launches
    .find(
      {},
      {
        __v: 0, // version
        _id: 0,
      }
    )
    .sort("flightNumber")
    .skip(skip)
    .limit(docsLimit);
};

const scheduleLaunch = async (launch) => {
  const planet = await planets.findOne({
    kepler_name: launch.destination,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  const newLaunch = Object.assign(launch, {
    customers: ["Zero To Mastery", "NASA"],
    upcoming: true,
    success: true,
    flightNumber: (await getLatestFlightNumber()) + 1,
  });

  const launchScheduled = await saveLaunch(newLaunch);

  if (!launchScheduled) {
    throw new Error("Failed to schedule launch");
  }

  return launchScheduled;
};

const saveLaunch = async (newLaunch) => {
  try {
    await launches.findOneAndUpdate(
      {
        flightNumber: newLaunch.flightNumber,
      },
      newLaunch,
      { upsert: true }
    );

    return newLaunch;
  } catch (err) {
    console.error(err);
  }
};

// const addNewLaunch = (launch) => {
//   latestFlightNumber++;

//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       flightNumber: latestFlightNumber,
//       customers: ["Zero To Mastery", "NASA"],
//       upcoming: true,
//       success: true,
//     })
//   );

//   return launches;
// };

const abortLaunch = async (flightNumber) => {
  // const launchToBeAborted = launches.get(flightNumber);
  try {
    const launchToBeAborted = await launches.findOne({
      flightNumber: flightNumber,
    });

    if (!launchToBeAborted) {
      throw new Error("No matching flight number found");
    }

    // launchToBeAborted.success = false;
    // launchToBeAborted.upcoming = false;

    // await saveLaunch(launchToBeAborted);

    const aborted = await launches.findOneAndUpdate(
      { flightNumber: flightNumber },
      { success: false, upcoming: false }
    );

    return aborted;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllLaunches,
  scheduleLaunch,
  abortLaunch,
  saveLaunch,
};
