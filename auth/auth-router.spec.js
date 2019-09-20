const request = require("supertest");

const db = require("../database/dbConfig.js");

const server = require("../api/server.js");

describe("auth-router.js", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST /api/auth/register", () => {
    it("responds with 201 OK", async done => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "test3", password: "test" })
        .expect(201);

      done();
    });

    it("responds with JSON", async done => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "test4", password: "test" })
        .expect("Content-Type", /json/i);

      done();
    });
  });

  describe("POST /api/auth/login", () => {
    it("responds with 200 OK", async done => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "test3", password: "test" });

      await request(server)
        .post("/api/auth/login")
        .send({ username: "test3", password: "test" })
        .expect(200);

      done();
    });

    it("responds with JSON", async done => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "test4", password: "test" });

      await request(server)
        .post("/api/auth/login")
        .send({ username: "test4", password: "test" })
        .expect("Content-Type", /json/i);

      done();
    });
  });
});
