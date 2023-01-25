import express from "express";
import playlistRouter from "./playlist.router";

const api = express();

api.use("/playlist", playlistRouter);

export default api;
