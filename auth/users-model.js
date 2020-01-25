const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");

function get() {
  return db("users");
}

function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getBy(filter) {
  return db("users")
    .where(filter)
    .select("id", "username", "password");
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db("users").insert(user);

  return getById(id);
}

module.exports = {
  get,
  getBy,
  getById,
  add
};
