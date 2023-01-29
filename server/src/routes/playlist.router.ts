import express from "express";
const playlistRouter = express.Router();

import {
  getPlaylistController,
  getUniqueMusicTypesController,
  // postMusicController,
} from "../controllers/playlist.controller";

playlistRouter.post("/", getPlaylistController);
playlistRouter.get("/music-type-list", getUniqueMusicTypesController);
// playlistRouter.post("/", postMusicController);

export default playlistRouter;
