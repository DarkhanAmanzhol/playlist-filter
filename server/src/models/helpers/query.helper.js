function createFilteredQueries(filters) {
  let query = ``;
  if (filters.singers.length) {
    query += `(singer = '${filters.singers[0]}' `;
    for (let i = 1; i < filters.singers.length; i++) {
      query += `OR singer = '${filters.singers[i]}' `;
    }
    query += `) `;
  }
  if (filters.singers.length && filters.genres.length) query += `AND `;
  if (filters.genres.length) {
    query += `(genre = '${filters.genres[0]}' `;
    for (let i = 1; i < filters.genres.length; i++) {
      query += `OR genre = '${filters.genres[i]}' `;
    }
    query += `) `;
  }
  if ((filters.singers.length || filters.genres.length) && filters.years.length) query += `AND `;
  if (filters.years.length) {
    query += `(year = ${filters.years[0]} `;
    for (let i = 1; i < filters.years.length; i++) {
      query += `OR year = ${filters.years[i]} `;
    }
    query += `) `;
  }

  if (filters.singers.length || filters.genres.length || filters.years.length) return `WHERE ` + query;
  return ``;
}

module.exports = { createFilteredQueries };
