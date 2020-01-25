// example seed data
exports.seed = async knex => {
  await knex("users").truncate();

  await knex("users").insert([
    { username: "carol", password: "123456" },
    { username: "olivia", password: "654321" },
    { username: "rachel", password: "123abc" },
    { username: "tessa", password: "cba321" },
    { username: "brienne", password: "321cba" }
  ]);
};
