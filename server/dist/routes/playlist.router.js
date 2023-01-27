"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playlistRouter = express_1.default.Router();
const playlist_controller_1 = require("../controllers/playlist.controller");
playlistRouter.post("/", playlist_controller_1.getPlaylistController);
// playlistRouter.post("/", postMusicController);
exports.default = playlistRouter;
