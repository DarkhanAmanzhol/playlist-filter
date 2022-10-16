// const { Client } = require("pg");

// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "root",
//   database: "postgres",
// });

// client.connect();

// client.query(`Select * from `);

const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  port: 5432,
  database: "music_player",
});

module.exports = pool;
