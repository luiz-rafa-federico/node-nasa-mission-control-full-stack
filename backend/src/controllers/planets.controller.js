const planets = require("../models/planets.model");

const listPlanets = (req, res) => {
  const response = { content: planets, status: "successful" };
  return res.json(response);
};

module.exports = {
  listPlanets,
};
