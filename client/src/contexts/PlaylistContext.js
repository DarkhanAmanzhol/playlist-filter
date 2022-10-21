import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PlaylistContext = createContext();

function PlaylistContextProvider(props) {
  const [playlist, setPlaylist] = useState([]);
  const [filters, setFilters] = useState({
    singers: [],
    genres: [],
    years: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    singer: "All",
    genre: "All",
    year: "All",
  });

  // Fetching data from API
  const fetchAllPlaylist = async () => {
    const response = await axios.get("/api/playlist");
    const playlistData = response.data.playlist;
    setPlaylist(playlistData);
  };

  useEffect(() => {
    fetchAllPlaylist();
  }, []);

  // Unique singers, genres, years
  useEffect(() => {
    let singersWithDuplicates = [];
    let genresWithDuplicates = [];
    let yearsWithDuplicates = [];

    playlist.map((music) => {
      singersWithDuplicates.push(music.singer);
      genresWithDuplicates.push(music.genre);
      yearsWithDuplicates.push(music.year);
    });

    singersWithDuplicates.sort();
    genresWithDuplicates.sort();
    yearsWithDuplicates.sort((a, b) => {
      return a - b;
    });

    setFilters({
      singers: [...new Set(singersWithDuplicates)],
      genres: [...new Set(genresWithDuplicates)],
      years: [...new Set(yearsWithDuplicates)],
    });
  }, [playlist]);

  // Clear Filter by click button
  const onClearFilters = () => {
    fetchAllPlaylist();
    setSelectedFilters({
      singer: "All",
      genre: "All",
      year: "All",
    });
    console.log(selectedFilters);
  };

  // For sorting playlists than fetched
  const onSelectedFilters = async (event) => {
    const { name, value } = event.target;

    const tempSelectedFilters = { ...selectedFilters, [name]: value };

    setSelectedFilters(tempSelectedFilters);

    let newPlaylist = playlist;

    if (value === "All") {
      const response = await axios.get("/api/playlist");
      newPlaylist = response.data.playlist;
    }

    if (tempSelectedFilters.singer !== "All") {
      newPlaylist = newPlaylist.filter((music) => {
        return music.singer === tempSelectedFilters.singer;
      });
    }
    if (tempSelectedFilters.genre !== "All") {
      newPlaylist = newPlaylist.filter((music) => {
        return music.genre === tempSelectedFilters.genre;
      });
    }
    if (tempSelectedFilters.year !== "All") {
      newPlaylist = newPlaylist.filter((music) => {
        return music.year === parseInt(tempSelectedFilters.year);
      });
    }

    setPlaylist(newPlaylist);
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        filters,
        onSelectedFilters,
        selectedFilters,
        onClearFilters,
      }}
    >
      {props.children}
    </PlaylistContext.Provider>
  );
}

export default PlaylistContextProvider;
