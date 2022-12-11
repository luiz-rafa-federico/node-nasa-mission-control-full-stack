// const { planets } = require("../../../models/planets.model");
const planets = require("../../../models/planets.mongo.js");

const getAllPlanets = async () => {
  return await planets.find({});
};

module.exports = {
  getAllPlanets,
};
