const { getPlaylist, postMusic } = require("../models/playlist.model");

async function getPlaylistController(req, res) {
  const playlist = await getPlaylist();

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
};
