Experimental

# Project - Playlist Filter (React, NodeJS, PostgreSQL) + Set up for the localhost

<b>This project is available in the docker image and can be set up locally</b>

---

## Docker compose.

To run use command `docker compose up`. It should automatically create project and postgres images.

Check the <a href="http://localhost:5000/">port 5000</a>.

The project can be cleaned by using script commands from the file `bash docker-clean.sh`.

---

## 1. How to start this project on localhost. (STILL UPDATING THIS PART!!!)

You must have `Node` and `postgresql` installed on your machine.
If you don't have them, here are the links: <a href="https://kinsta.com/blog/how-to-install-node-js/">Node</a> and <a href="https://www.postgresqltutorial.com/postgresql-getting-started/">PostgreSQL</a>. <b>Choose the version that suitable to your machine.</b>

### 2. Configuring the PostgreSql database.

- Navigate to the file that contain configuration of the database: <b><a href="https://github.com/DarkhanAmanzhol/playlist-filter/blob/master/server/src/database/postgresql.js">/server/src/database/postgresql.js</a></b>.
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

If all went well, the project should be available in the <a href="http://localhost:5000/">port 5000</a>.
