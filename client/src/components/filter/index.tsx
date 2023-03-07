import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { PlaylistContext } from "../../contexts/PlaylistContext";
import { parseToOptionsArray } from "../../helpers/parseToOptionsArray";
import Select from "react-select";

function Filter() {
  const context = useContext(PlaylistContext);
  const uniqueTypes = context?.uniqueTypes;
  const setSelectedFilters = context?.setSelectedFilters;
  const setCurrentPage = context?.setCurrentPage;

  const [selectedSingers, setSelectedSingers] = useState<{ value: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<{ value: string }[]>([]);
  const [selectedYears, setSelectedYears] = useState<{ value: string }[]>([]);

  const singerOptions = parseToOptionsArray(uniqueTypes.singers);
  const genreOptions = parseToOptionsArray(uniqueTypes.genres);
  const yearOptions = parseToOptionsArray(uniqueTypes.years);

  useEffect(() => {
    setCurrentPage(0);
    setSelectedFilters({
      singers: selectedSingers.map((item) => item["value"]),
      genres: selectedGenres.map((item) => item["value"]),
      years: selectedYears.map((item) => item["value"]),
    });
  }, [selectedSingers, selectedGenres, selectedYears, setCurrentPage, setSelectedFilters]);

  // TODO: Somehow change the type of the option of any!
  return (
    <div className="filter-playlist">
      <div className="filter-playlist__label">Singers</div>
      <Select
        isMulti
        className="filter-playlist__select"
        value={selectedSingers}
        onChange={(option) => setSelectedSingers(option as any)}
        options={singerOptions}
      />
      <div className="filter-playlist__label">Genres</div>
      <Select
        isMulti
        className="filter-playlist__select"
        value={selectedGenres}
        onChange={(option) => setSelectedGenres(option as any)}
        options={genreOptions}
      />
      <div className="filter-playlist__label">Years</div>
      <Select
        isMulti
        className="filter-playlist__select"
        value={selectedYears}
        onChange={(option) => setSelectedYears(option as any)}
        options={yearOptions}
      />
    </div>
  );
}

export default Filter;
