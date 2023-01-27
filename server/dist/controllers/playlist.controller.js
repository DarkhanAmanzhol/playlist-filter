"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMusicController = exports.getPlaylistController = void 0;
const playlist_model_1 = require("../models/playlist.model");
function getPlaylistController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.query;
        const { page, perPage, column, order } = query;
        const filters = req.body;
        const playlist = yield (0, playlist_model_1.getMusics)(page, perPage, column, order, filters);
        const quantity = yield (0, playlist_model_1.getQuantityMusics)(filters);
        const uniqueTypes = yield (0, playlist_model_1.getUniqueMusicTypes)();
        return res.status(200).json({
            status: "success",
            quantity,
            playlist,
            uniqueTypes,
        });
    });
}
exports.getPlaylistController = getPlaylistController;
function postMusicController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newMusic = req.body;
        const response = yield (0, playlist_model_1.postMusic)(newMusic);
        if (response) {
            return res.status(200).json({
                status: "success",
                music: response,
            });
        }
        else {
            return res.status(400).json({
                status: "failed",
                message: "Something went wrong!",
            });
        }
    });
}
exports.postMusicController = postMusicController;
