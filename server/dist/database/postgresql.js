"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const insertMusics_1 = __importDefault(require("./insertMusics"));
// const pool = new Pool({
//   host: "postgres-db",
//   user: "postgres",
//   password: "123456",
//   port: 5432,
//   database: "musics",
// });
const pool = new pg_1.Pool({
    host: "localhost",
    user: "postgres",
    password: "root",
    port: 5432,
    database: "musics",
});
pool.on("connect", (client) => {
    client.query(`CREATE TABLE IF NOT EXISTS playlist(
                id SERIAL PRIMARY KEY,
                singer VARCHAR(255),
                song VARCHAR(255),
                genre VARCHAR(255),
                year INTEGER
            );`);
    // Initialize database
    client.query(insertMusics_1.default);
});
exports.default = pool;
