const pool = require("../database/postgresql");

async function getPlaylist() {
  const playlist = await pool.query("SELECT * FROM playlist");
  return playlist.rows;
}

async function postMusic({ singer, song, genre, year }) {
  if (!singer || !song || !genre || !year) return false;
  const response = await pool.query(
    "INSERT INTO playlist (singer, song, genre, year) values ($1, $2, $3, $4) RETURNING *",
    [singer, song, genre, year]
  );
  console.log(response);
  return response.rows[0];
}

module.exports = {
  getPlaylist,
  postMusic,
};
