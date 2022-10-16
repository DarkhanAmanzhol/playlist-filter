const pool = require("../database/postgresql");

async function getPlaylist() {
  const playlist = await pool.query("SELECT * FROM playlist");
  return playlist.rows;
}

async function getPlaylistBySinger(singer) {
  const playlist = await pool.query(
    "SELECT * FROM playlist where singer = $1",
    [singer]
  );

  return playlist.rows;
}
async function getPlaylistByGenre(genre) {
  const playlist = await pool.query("SELECT * FROM playlist where genre = $1", [
    genre,
  ]);

  return playlist.rows;
}
async function getPlaylistByYear(year) {
  const playlist = await pool.query("SELECT * FROM playlist where year = $1", [
    year,
  ]);

  return playlist.rows;
}

async function postMusic({ singer, song, genre, year }) {
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
  getPlaylistBySinger,
  getPlaylistByGenre,
  getPlaylistByYear,
};
