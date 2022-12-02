const request = require("supertest");
const app = require("../app.js");

describe("Test GET / launches", () => {
  test("It should respond with a 200 code success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
    // expect(response.statusCode).toBe(200); => this is from jest; the above is from supertest
  });
});

describe("Test POST / launches", () => {
  test("It should respond with a 201 code success", () => {});

  test("It should catch missing required properties", () => {});

  test("It should catch invalid dates", () => {});
});
