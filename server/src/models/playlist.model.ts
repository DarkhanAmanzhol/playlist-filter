import pool from "../database/postgresql";
import { createFilteredQueries } from "./helpers/query.helper";
import { Filters, MusicProperties } from "../controllers/playlist.controller";

async function getMusics(
  page = 0,
  perPage = 25,
  column = "singer",
  order = "ASC",
  filters = {
    singers: [],
    genres: [],
    years: [],
  }
) {
  const queryFilters = createFilteredQueries(filters);

  const playlist = await pool.query(
    `SELECT playlist.id as id, singer, song, genre, year FROM playlist
    INNER JOIN genres ON playlist.genre_id = genres.id
     ${queryFilters} ORDER BY ${column} ${order} LIMIT ${perPage} OFFSET ${page * perPage};`
  );

  return playlist.rows as MusicProperties[];
}

async function getQuantityMusics(filters: Filters) {
  let query = `SELECT count(*) FROM playlist INNER JOIN genres ON playlist.genre_id = genres.id `;

  if (filters.singers?.length || filters.genres?.length || filters.years?.length) {
    query += createFilteredQueries(filters);
  }

  const quantity = await pool.query(query);

  return quantity.rows[0].count as number;
}

async function getUniqueMusicTypes() {
  const singers = await pool.query("SELECT DISTINCT singer FROM playlist ORDER BY singer;");
  const genres = await pool.query("SELECT genre FROM genres ORDER BY genre;");
  const years = await pool.query("SELECT DISTINCT year FROM playlist ORDER BY year;");

  const uniqueTypes: Filters = {
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

async function postMusic({ singer, song, genre, year }: MusicProperties) {
  let genre_id = 0;
  if (!singer || !song || !genre || !year) return false;

  const genres = await pool.query("SELECT genre FROM genres ORDER BY genre;");
  if (genres.rows[0].includes(genre)) genre_id = genres.rows[0].indexOf(genre) + 1;
  else {
    await pool.query(`INSERT INTO genres (genre) values (${genre})`);
    genre_id = genres.rowCount + 1;
  }

  const response = await pool.query(
    "INSERT INTO playlist (singer, song, genre, year) values ($1, $2, $3, $4) RETURNING *",
    [singer, song, genre_id, year]
  );

  return response.rows[0] as MusicProperties;
}

export { getMusics, getQuantityMusics, getUniqueMusicTypes, postMusic };
