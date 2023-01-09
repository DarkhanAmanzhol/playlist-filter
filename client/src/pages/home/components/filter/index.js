// css is global path: /client/src/pages/Home.css
import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { PlaylistContext } from "contexts/PlaylistContext";
import { parseToOptionsArray } from "./lib";
import Select from "react-select";

function Filter() {
  const { uniqueTypes, setSelectedFilters } = useContext(PlaylistContext);
  const [selectedSingers, setSelectedSingers] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  const singerOptions = parseToOptionsArray(uniqueTypes.singers);
  const genreOptions = parseToOptionsArray(uniqueTypes.genres);
  const yearOptions = parseToOptionsArray(uniqueTypes.years);

  useEffect(() => {
    setSelectedFilters({
      singers: selectedSingers.map((item) => item["value"]),
      genres: selectedGenres.map((item) => item["value"]),
      years: selectedYears.map((item) => item["value"]),
    });
  }, [selectedSingers, selectedGenres, selectedYears]);

  return (
    <div className="filter-playlist">
      <Select
        isMulti
        className="filter-playlist__select"
        value={selectedSingers}
        onChange={setSelectedSingers}
        options={singerOptions}
      />
      <Select
        isMulti
        className="filter-playlist__select"
        value={selectedGenres}
        onChange={setSelectedGenres}
        options={genreOptions}
      />
      <Select
        isMulti
        className="filter-playlist__select"
        value={selectedYears}
        onChange={setSelectedYears}
        options={yearOptions}
      />
    </div>
  );
}

export default Filter;
