const launches = require("../../../models/mongo/launches.mongo");
const planets = require("../../../models/mongo/planets.mongo");
const { getLatestFlightNumber } = require("../../../models/launches.model");

const getAllLaunches = async () => {
  // for (const value of launches.values()) {}
  // return Array.from(launches.values());
  return await launches.find(
    {},
    {
      __v: 0, // version
      _id: 0,
    }
  );
};

const scheduleLaunch = async (launch) => {
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
    const planet = await planets.findOne({
      kepler_name: newLaunch.destination,
    });

    if (!planet) {
      throw new Error("No matching planet found");
    }

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

// const abortLaunch = (flightNumber) => {
//   const launchToBeAborted = launches.get(flightNumber);

//   if (launchToBeAborted) {
//     // launches.delete(flightNumber);
//     launchToBeAborted.upcoming = false;
//     launchToBeAborted.success = false;
//     return launchToBeAborted;
//   } else {
//     return false;
//   }
// };

module.exports = {
  getAllLaunches,
  scheduleLaunch,
};
