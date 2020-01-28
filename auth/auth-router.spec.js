const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

test("POST /register - register user route", async () => {
  await db.seed.run();
  const res = await supertest(server)
    .post("/api/auth/register")
    .send({ username: "ruth", password: "123abc" });

  // does it return the expected status code?
  expect(res.status).toBe(201);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.username).toMatch(/ruth/i);
});

test("POST /login - login user route", async () => {
  const res = await supertest(server)
    .post("/api/auth/login")
    .send({ username: "ruth", password: "123abc" });

  // does it return the expected status code?
  expect(res.status).toBe(200);

  // does it return the expected data format?
  expect(res.type).toBe("application/json");

  // does it return the expected data?
  expect(res.body.message).toMatch(/successfully logged in/i);
  // expect(res.body.user).toBe(1);
  expect(res.body.token).not.toBeNull();
});
