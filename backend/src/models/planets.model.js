const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const planets = require("./mongo/planets.mongo");

// const habitablePlanets = [];

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
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          // habitablePlanets.push(data)
          // insert + update = upsert => create only if does not exist on db
          await savePlanets(data);
        }
      })
      .on("error", (err) => {
        console.error(err);
        reject(err);
      })
      .on("end", () => resolve());
  });
};

const savePlanets = async (planet) => {
  try {
    await planets.updateOne(
      {
        kepler_name: planet.kepler_name,
      },
      { kepler_name: planet.kepler_name },
      { upsert: true }
    );
  } catch (err) {
    console.error(`Failed to save planets due to ${err}`);
  }
};

module.exports = {
  loadPlanetsData,
  // planets: habitablePlanets,
};
