const express = require("express");
const api = express();

const playlistRouter = require("./playlist.router");

api.use("/playlist", playlistRouter);

module.exports = api;
