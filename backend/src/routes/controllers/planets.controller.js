const { getAllPlanets } = require("./services/planets.service");

const listPlanets = (req, res) => {
  const planets = getAllPlanets();

  return res.json(planets);
};

module.exports = {
  listPlanets,
};
