const { planets } = require("../../../models/planets.model");

const getAllPlanets = () => {
  return planets;
};

module.exports = {
  getAllPlanets,
};
