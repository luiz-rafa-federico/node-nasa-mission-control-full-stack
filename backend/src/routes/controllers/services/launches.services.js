const { launches } = require("../../../models/launches.model");

const getAllLaunches = () => {
  // for (const value of launches.values()) {}
  return Array.from(launches.values());
};

module.exports = {
  getAllLaunches,
};
