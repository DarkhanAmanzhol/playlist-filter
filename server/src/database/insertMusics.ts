import musics from "./musics.json";

let insertAll = "";
let insertToPlaylist = `INSERT INTO playlist (id, singer, song, genre_id, year) VALUES `;
let insertToGenres = `INSERT INTO genres (id, genre) VALUES `;

const reducedMusics = musics.slice(0, 500);

const genres = reducedMusics.map((item) => item.genre);
const unique_genres = genres.filter((item, index) => genres.indexOf(item) === index);

reducedMusics.forEach((music, index) => {
  if (index !== 0) {
    insertToPlaylist += `,`;
  }
  insertToPlaylist += `(${index + 1}, 
      '${music.singer.replaceAll("'", "''")}', 
      '${music.song.replaceAll("'", "''")}',
       ${unique_genres.indexOf(music.genre) + 1}, 
       ${music.year})`;
});

insertToPlaylist += ` ON CONFLICT (id) DO NOTHING;`;

unique_genres.forEach((genre, index) => {
  if (index !== 0) {
    insertToGenres += `,`;
  }
  insertToGenres += `(${index + 1}, '${genre.replaceAll("'", "''")}')`;
});

insertToGenres += ` ON CONFLICT (id) DO NOTHING;`;

insertAll = insertToPlaylist + insertToGenres;

export default insertAll;
