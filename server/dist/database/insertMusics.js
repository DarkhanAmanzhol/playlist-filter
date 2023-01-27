"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const musics_json_1 = __importDefault(require("./musics.json"));
let insertMusics = `INSERT INTO playlist (id, singer, song, genre, year) VALUES `;
const reducedMusics = musics_json_1.default.slice(0, 100);
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
exports.default = insertMusics;
