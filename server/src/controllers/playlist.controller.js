const {
  getPlaylist,
  postMusic,
  getPlaylistBySinger,
  getPlaylistByGenre,
  getPlaylistByYear,
} = require("../models/playlist.model");

async function getPlaylistController(req, res) {
  const playlist = await getPlaylist();

  return res.status(200).json({
    status: "success",
    playlist: playlist,
  });
}

async function getPlaylistBySingerController(req, res) {
  const singer = req.params.singer;

  const playlist = await getPlaylistBySinger(singer);

  return res.status(200).json({
    status: "success",
    playlist: playlist,
  });
}
async function getPlaylistByGenreController(req, res) {
  const genre = req.params.genre;

  const playlist = await getPlaylistByGenre(genre);

  return res.status(200).json({
    status: "success",
    playlist: playlist,
  });
}
async function getPlaylistByYearController(req, res) {
  const year = req.params.year;

  const playlist = await getPlaylistByYear(year);

  return res.status(200).json({
    status: "success",
    playlist: playlist,
  });
}

async function postMusicController(req, res) {
  const newMusic = req.body;

  const response = await postMusic(newMusic);

  if (response) {
    return res.status(200).json({
      status: "success",
      music: response,
    });
  } else {
    return res.status(400).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
}

module.exports = {
  getPlaylistController,
  postMusicController,
  getPlaylistBySingerController,
  getPlaylistByGenreController,
  getPlaylistByYearController,
};
