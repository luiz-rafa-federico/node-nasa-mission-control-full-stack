const request = require("supertest");
const app = require("../app.js");
const { connectDB, disconnectDB } = require("../database/connection");
const { loadLaunchesData } = require("../models/launches.model.js");

const API_VERSION = "v1";

describe("Launches API", () => {
  beforeAll(async () => {
    await connectDB();
    await loadLaunchesData();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe("Test GET /launches", () => {
    test("It should respond with a 200 code success", async () => {
      const response = await request(app)
        .get(`/${API_VERSION}/launches`)
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

    const launchWithInvalidDate = {
      mission: "ZTM Food Research",
      rocket: "Apolo Star IXT",
      destination: "Kepler-1410 b",
      launchDate: "hello",
    };

    test("It should respond with a 201 code success", async () => {
      const response = await request(app)
        .post(`/${API_VERSION}/launches`)
        .send(completeLaunch)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunch.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchWithoutDate);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post(`/${API_VERSION}/launches`)
        .send(launchWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Required fields are missing",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post(`/${API_VERSION}/launches`)
        .send(launchWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid Date",
      });
    });
  });
});
