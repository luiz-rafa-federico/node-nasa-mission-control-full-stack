const request = require("supertest");
const app = require("../app.js");

describe("Test GET /launches", () => {
  test("It should respond with a 200 code success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
    // expect(response.statusCode).toBe(200); => this is from jest; the above is from supertest
  });
});

describe("Test POST /launches", () => {
  const completeLaunch = {
    mission: "ZTM Food Research",
    rocket: "Apolo Star IXT",
    destination: "Kepler-1410 b",
    launchDate: "January 14, 2025",
  };

  const launchWithoutDate = {
    mission: "ZTM Food Research",
    rocket: "Apolo Star IXT",
    destination: "Kepler-1410 b",
  };

  test("It should respond with a 201 code success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunch)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunch.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchWithoutDate);
  });

  test("It should catch missing required properties", () => {});

  test("It should catch invalid dates", () => {});
});
