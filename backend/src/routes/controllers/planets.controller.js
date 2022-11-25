const { getAllPlanets } = require("./services/planets.service");

const listPlanets = (req, res) => {
  const planets = getAllPlanets();
  const response = { content: planets, status: "successful" };
  return res.json(response);
};

module.exports = {
  listPlanets,
};
