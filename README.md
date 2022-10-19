# Project - Playlist Filter (React, NodeJS, PostgreSQL) + Set up for the localhost

### 1. How to start this project on localhost.

You must have `Node` and `postgresql` installed on your machine.
If you don't have them, here are the links: <a href="https://nodejs.org/en/download/">Node</a> and <a href="https://www.postgresqltutorial.com/postgresql-getting-started/">PostgreSQL</a>. <b>Choose the version that suitable to your machine.</b>

### 2. Configuring the PostgreSql database.

If you have just installed PostgreSql, you can see the stage where you need to go to the `SQL shell`. Enter your username and password into it. In my case it was the user name `postgres` (default) and the password `root`. It is better not to use the same configuration for the production stage.

After logging into the shell, please enter each command in turn, as shown below:

`CREATE DATABASE music_player;`

`\c music_player`

`create TABLE playlist( id SERIAL PRIMARY KEY, singer VARCHAR(255), song VARCHAR(255), genre VARCHAR(255), year INTEGER );`

`INSERT INTO playlist (singer, song, genre, year) VALUES ('The Kingston Trio', 'Tom Dooley', 'folk', 1958);`

`INSERT INTO playlist (singer, song, genre, year) VALUES ('led Zeppelin', 'Kashmir', 'rock', 1975);`

`INSERT INTO playlist (singer, song, genre, year) VALUES ('Miles Davis', 'Blue in Green', 'jazz', 1959);`

`INSERT INTO playlist (singer, song, genre, year) VALUES ('Muddy Waters', 'Mannish Boy', 'blues', 1955);`

`INSERT INTO playlist (singer, song, genre, year) VALUES ('Nirvana', 'Smells Like Teen Spirit', 'rock', 1991);`

<i>This is all the data I can give. If you want, you can write more. But this data is more than enough for filtering.</i>

##### 2.1 Changes in files, if needed (EXTRA)

- Navigate to the file that is in this folder <b><a href="https://github.com/DarkhanAmanzhol/playlist-filter/blob/master/server/src/database/postgresql.js">/server/src/database/postgresql.js</a></b>.
  Update the `pool` configuration if you changed one of the values when setting up `postgresql` or if you already had this sql environment.
- If your database is different from `playlist`, go to the file <b><a href="https://github.com/DarkhanAmanzhol/playlist-filter/blob/master/server/src/models/playlist.model.js">/server/src/models/playlist.model.js</a></b>.
  Update the `playlist` table to the one you named in your database.

### 3. Run the project

From the source code, use these commands to start your project:

`npm install`

`npm install --prefix client`

`npm run build --prefix client`

`npm run start`

If all went well, the project should be available in the port <a href="http://localhost:5000/">5000</a>.
