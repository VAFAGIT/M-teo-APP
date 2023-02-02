const request = require("supertest");
const app = require("../server");

describe("Login endpoint", () => {
  it("returns a status of 200", async () => {
    const response = await request(app).post("/api/auth/");
    expect(response.statusCode).toBe(200);
  });
});
