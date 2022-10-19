const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  port: 5432,
  database: "music_player",
});

module.exports = pool;
