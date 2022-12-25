const musics = require("./musics.json");

let insertMusics = `INSERT INTO playlist (id, singer, song, genre, year) VALUES `;

const reducedMusics = musics.slice(0, 100);

reducedMusics.forEach((music, index) => {
  if (index !== 0) {
    insertMusics += `,`;
  }
  insertMusics += `(${index + 1}, 
    '${music.singer.replaceAll("'", "''")}', 
    '${music.song.replaceAll("'", "''")}',
    '${music.genre.replaceAll("'", "''")}', 
     ${music.year})`;
});

insertMusics += ` ON CONFLICT (id) DO NOTHING;`;

console.log(insertMusics);

module.exports = insertMusics;
