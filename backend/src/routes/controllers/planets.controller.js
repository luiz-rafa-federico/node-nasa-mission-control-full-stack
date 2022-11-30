const { getAllPlanets } = require("./services/planets.service");

const httpListPlanets = (req, res) => {
  const planets = getAllPlanets();

  return res.json(planets);
};

module.exports = {
  httpListPlanets,
};
