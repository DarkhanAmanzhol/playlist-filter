const { Pool } = require("pg");

const pool = new Pool({
  host: "postgres-db",
  user: "postgres",
  password: "123456",
  port: 5432,
  database: "musics",
});

pool.on("connect", (client) => {
  client.query(`CREATE TABLE IF NOT EXISTS "playlist"(
                "id" SERIAL PRIMARY KEY,
                "singer" VARCHAR(255),
                "song" VARCHAR(255),
                "genre" VARCHAR(255),
                "year" INTEGER
            );`);

  // Initialize database
  client.query(`INSERT INTO playlist (id, singer, song, genre, year) VALUES 
            (1, 'Imagine Dragons', 'Bones', 'rock', 2022),
            (2, 'Imagine Dragons', 'Believer', 'rock', 2017), 
            (3, 'Stevie Ray Vaughan', 'Little Wing', 'blues', 1984),
            (4, 'John Lee Hooker', 'One Bourbon, One Scotch, One Beer', 'blues', 1953)
            ON CONFLICT (id) DO NOTHING;`);
});

module.exports = pool;
