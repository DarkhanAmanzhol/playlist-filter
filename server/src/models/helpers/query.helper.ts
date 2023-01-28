import { Filters } from "../../controllers/playlist.controller";

export function createFilteredQueries(filters: Filters) {
  let query = ``;

  if (!filters.singers) filters.singers = [];
  if (!filters.genres) filters.genres = [];
  if (!filters.years) filters.years = [];

  if (filters.singers.length) {
    query += `(playlist.singer = '${filters.singers[0]}' `;
    for (let i = 1; i < filters.singers.length; i++) {
      query += `OR playlist.singer = '${filters.singers[i]}' `;
    }
    query += `) `;
  }
  if (filters.singers.length && filters.genres.length) query += `AND `;
  if (filters.genres.length) {
    query += `(genres.genre = '${filters.genres[0]}' `;
    for (let i = 1; i < filters.genres.length; i++) {
      query += `OR genres.genre = '${filters.genres[i]}' `;
    }
    query += `) `;
  }
  if ((filters.singers.length || filters.genres.length) && filters.years.length) query += `AND `;
  if (filters.years.length) {
    query += `(playlist.year = ${filters.years[0]} `;
    for (let i = 1; i < filters.years.length; i++) {
      query += `OR playlist.year = ${filters.years[i]} `;
    }
    query += `) `;
  }

  if (filters.singers.length || filters.genres.length || filters.years.length) return `WHERE ` + query;
  return ``;
}
