// const { planets } = require("../../../models/planets.model");
const planets = require("../../../models/mongo/planets.mongo.js");

const getAllPlanets = async () => {
  return await planets.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  );
};

module.exports = {
  getAllPlanets,
};
