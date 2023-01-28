const axios = require("axios");
const jsdom = require("jsdom");
const fs = require("fs");
const path = require("path");

const { JSDOM } = jsdom;

const url = "https://en.wikipedia.org/wiki/List_of_downloadable_songs_for_the_Rock_Band_series";

async function getMusics() {
  const response = await axios.get(url);

  const dom = new JSDOM(response.data);

  const musics = [];

  dom.window.document.querySelectorAll(".wikitable td:nth-child(1)").forEach(
    (node, index) =>
      (musics[index] = {
        song: node.textContent.trim().replaceAll('"', ""),
      })
  );

  dom.window.document
    .querySelectorAll(".wikitable td:nth-child(2)")
    .forEach((node, index) => (musics[index].singer = node.textContent.trim()));

  dom.window.document
    .querySelectorAll(".wikitable td:nth-child(3)")
    .forEach((node, index) => (musics[index].year = parseInt(node.textContent.trim())));

  dom.window.document
    .querySelectorAll(".wikitable td:nth-child(4)")
    .forEach((node, index) => (musics[index].genre = node.textContent.trim().toLowerCase()));

  fs.writeFileSync(path.join(__dirname, "..", "src", "database", "musics.json"), JSON.stringify(musics));
}

getMusics();
