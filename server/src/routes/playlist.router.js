const express = require("express");
const playlistRouter = express.Router();

const {
  getPlaylistController,
  postMusicController,
  getPlaylistBySingerController,
  getPlaylistByGenreController,
  getPlaylistByYearController,
} = require("../controllers/playlist.controller");

playlistRouter.get("/", getPlaylistController);
playlistRouter.get("/singer/:singer", getPlaylistBySingerController);
playlistRouter.get("/genre/:genre", getPlaylistByGenreController);
playlistRouter.get("/year/:year", getPlaylistByYearController);
playlistRouter.post("/", postMusicController);

module.exports = playlistRouter;
