const db = require("../database/dbConfig");
const usersModel = require("./users-model");

beforeEach(async () => {
  await db.seed.run();
});

describe("users model", () => {
  test("get", async () => {
    const res = await usersModel.get();
    expect(res).toHaveLength(5);
  });

  test("add", async () => {
    await usersModel.add({ username: "ruth", password: "123abc" });
    const users = await db("users");
    expect(users).toHaveLength(6);
  });

  test("getById", async () => {
    const res = await usersModel.getById(1);
    expect(res.username).toMatch(/carol/i);
  });
});
