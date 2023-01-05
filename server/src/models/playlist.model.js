const pool = require("../database/postgresql");

async function getMusics(
  page = 0,
  perPage = 20,
  column = "singer",
  order = "ASC"
) {
  const playlist = await pool.query(
    `SELECT * FROM playlist ORDER BY ${column} ${order} LIMIT ${perPage} OFFSET ${
      page * perPage
    };`
  );
  return playlist.rows;
}

async function getQuantityMusics() {
  const quantity = await pool.query("SELECT count(*) FROM playlist");

  return quantity.rows[0].count;
}

async function getUniqueMusicTypes() {
  const singers = await pool.query(
    "SELECT DISTINCT singer FROM playlist ORDER BY singer"
  );
  const genres = await pool.query(
    "SELECT DISTINCT genre FROM playlist ORDER BY genre"
  );
  const years = await pool.query(
    "SELECT DISTINCT year FROM playlist ORDER BY year"
  );

  const uniqueTypes = {
    singers: [],
    genres: [],
    years: [],
  };

  singers.rows.forEach((array) => {
    uniqueTypes.singers.push(array.singer);
  });

  genres.rows.forEach((array) => {
    uniqueTypes.genres.push(array.genre);
  });

  years.rows.forEach((array) => {
    uniqueTypes.years.push(array.year);
  });

  return uniqueTypes;
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
  getMusics,
  getQuantityMusics,
  getUniqueMusicTypes,
  postMusic,
};
