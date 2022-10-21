# Project - Playlist Filter (React, NodeJS, PostgreSQL) + Set up for the localhost

<b>This project is available in the docker image and can be set up locally</b>

### 1. How to start this project on localhost.

You must have `Node` and `postgresql` installed on your machine.
If you don't have them, here are the links: <a href="https://kinsta.com/blog/how-to-install-node-js/">Node</a> and <a href="https://www.postgresqltutorial.com/postgresql-getting-started/">PostgreSQL</a>. <b>Choose the version that suitable to your machine.</b>

### 2. Configuring the PostgreSql database.

If you have just installed PostgreSql, you can see the stage where you need to go to the `SQL shell`. Enter your username and password into it. In my case it was the user name `postgres` (default) and the password `root`. It is better not to use the same configuration for the production stage.

After logging into the shell, please enter each command in turn, as shown below:

`CREATE DATABASE music_player;`

`\c music_player`

`create TABLE playlist( id SERIAL PRIMARY KEY, singer VARCHAR(255), song VARCHAR(255), genre VARCHAR(255), year INTEGER );`

`INSERT INTO playlist (singer, song, genre, year) VALUES ('The Kingston Trio', 'Tom Dooley', 'folk', 1958),('led Zeppelin', 'Kashmir', 'rock', 1975), ('Miles Davis', 'Blue in Green', 'jazz', 1959), ('Muddy Waters', 'Mannish Boy', 'blues', 1955), ('Nirvana', 'Smells Like Teen Spirit', 'rock', 1991);`

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

##### Some errors that can occur when you run the project:

1. Cannot Get - no build.
   If `npm run build --prefix client` command builds the directory on the client, not on the server. Use another command `npm run client-build --prefix client` to fix this. The cause may be related to the operating system. In my case I checked on a VM linux machine. But for Windows first command should work fine.

2. No data in the playlist
   <a href="http://localhost:5000/api/playlist">First, please check this route when you start to run the project</a>
   Should appear error in the terminal, possible solutions: Wrong configuration of PostgreSql.
   Please check the password and other information in the file <b><a href="https://github.com/DarkhanAmanzhol/playlist-filter/blob/master/server/src/database/postgresql.js">postgresql.js</a></b>. Update `pool` configuration.

   If the error still appears, it is better to create a new user. <a href="https://phoenixnap.com/kb/postgres-create-user">Check this link</a>.

If all went well, the project should be available in the port <a href="http://localhost:5000/">5000</a>.

##### Docker files: This images work with AWS Cloud PostgreSq, so need internet.

- <a href="https://hub.docker.com/r/mentallin/playlist-filter">docker image with server and client itself and build (520MB)</a>
- <a href="https://hub.docker.com/r/mentallin/playlist-filter-lightweight">docker image with server and build (122MB)</a>
