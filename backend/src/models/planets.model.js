const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    // fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
    fs.createReadStream(
      "/Users/luizrafa.federico/Desktop/luiz/Tech/backend/node/node-nasa-mission-control-full-stack/backend/data/kepler_data.csv"
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.error(err);
        reject(err);
      })
      .on("end", () => resolve());
  });
};

module.exports = {
  loadPlanetsData,
  planets: habitablePlanets,
};

// CREATING A MODEL WITH MONGOOSE

const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  kepler_name: {
    type: String,
    required: true,
  },
});

mongoose.model("Planet", planetSchema);
