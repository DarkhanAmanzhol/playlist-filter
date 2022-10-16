import React, { useEffect, useState } from "react";

function FilterPlaylist({ playlist }) {
  const [singers, setSingers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);

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

    setSingers([...new Set(singersWithDuplicates)]);
    setGenres([...new Set(genresWithDuplicates)]);
    setYears([...new Set(yearsWithDuplicates)]);
  }, [playlist]);

  return (
    <div className="filter-playlist">
      <span>Singer</span>
      <select className="form-select" aria-label="Default select example">
        <option defaultValue>All</option>
        {singers.map((singer) => (
          <option key={singer} value={singer}>
            {singer}
          </option>
        ))}
      </select>
      <span>Genre</span>
      <select className="form-select" aria-label="Default select example">
        <option defaultValue>All</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <span>Year</span>
      <select className="form-select" aria-label="Default select example">
        <option defaultValue>All</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterPlaylist;
