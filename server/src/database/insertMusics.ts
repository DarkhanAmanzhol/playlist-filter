import musics from "./musics.json";

let insertMusics = `INSERT INTO playlist (id, singer, song, genre, year) VALUES `;

const reducedMusics = musics.slice(0, 500);

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

export default insertMusics;
