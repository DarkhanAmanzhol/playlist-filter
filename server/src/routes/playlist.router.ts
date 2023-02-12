import express from "express";
const playlistRouter = express.Router();

import {
  getPlaylistController,
  getUniqueMusicTypesController,
  // postMusicController,
} from "../controllers/playlist.controller";
import { playlistValidation } from "../middlewares/playlist.middleware";

playlistRouter.post("/", [playlistValidation], getPlaylistController);
playlistRouter.get("/music-type-list", getUniqueMusicTypesController);
// playlistRouter.post("/", postMusicController);

export default playlistRouter;
