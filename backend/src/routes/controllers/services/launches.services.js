const launches = require("../../../models/mongo/launches.mongo");

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

const saveLaunch = async (launch) => {
  try {
    await launches.updateOne(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      { upsert: true }
    );
    return true;
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
  saveLaunch,
};
