const {
  getMusics,
  getQuantityMusics,
  getUniqueMusicTypes,
  postMusic,
} = require("../models/playlist.model");

async function getPlaylistController(req, res) {
  const { page, perPage, column, order } = req.query;
  const filters = req.body;

  const playlist = await getMusics(page, perPage, column, order, filters);
  const quantity = await getQuantityMusics(filters);
  const uniqueTypes = await getUniqueMusicTypes();

  return res.status(200).json({
    status: "success",
    quantity,
    playlist,
    uniqueTypes,
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
