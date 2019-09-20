const request = require("supertest");

const jokesRouter = require("../api/server");

describe("jokesRouter", () => {
  describe("GET", () => {
    it("returns 400 need credential", () => {
      return request(jokesRouter)
        .get("/api/jokes")
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
    it("return JSON", done => {
      request(jokesRouter)
        .get("/api/jokes")
        .then(res => {
          expect(res.type).toMatch(/json/i);
          done();
        });
    });
  });
});
