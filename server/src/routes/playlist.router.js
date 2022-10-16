const express = require("express");
const playlistRouter = express.Router();

const {
  getPlaylistController,
  postMusicController,
} = require("../controllers/playlist.controller");

playlistRouter.get("/", getPlaylistController);
playlistRouter.post("/", postMusicController);

module.exports = playlistRouter;
