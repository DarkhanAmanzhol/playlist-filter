import express from "express";
const playlistRouter = express.Router();

import {
  getPlaylistController,
  // postMusicController,
} from "../controllers/playlist.controller";

playlistRouter.post("/", getPlaylistController);
// playlistRouter.post("/", postMusicController);

export default playlistRouter;
