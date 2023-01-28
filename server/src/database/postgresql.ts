import { Pool } from "pg";
import insertAll from "./insertMusics";

// const pool = new Pool({
//   host: "postgres-db",
//   user: "postgres",
//   password: "123456",
//   port: 5432,
//   database: "musics",
// });

const pool = new Pool({
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
                  genre_id INTEGER,
                  year INTEGER);
                
                CREATE TABLE IF NOT EXISTS genres(
                  id SERIAL primary key,
                  genre VARCHAR(255));`);

  // Initialize database
  client.query(insertAll);
});

export default pool;
