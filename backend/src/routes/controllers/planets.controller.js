const { getAllPlanets } = require("./services/planets.service");

const httpListPlanets = async (req, res) => {
  const planets = await getAllPlanets();

  return res.json(planets);
};

module.exports = {
  httpListPlanets,
};
