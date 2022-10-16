import React, { useEffect, useState } from "react";
import { PlaylistContext } from "../../contexts/PlaylistContext";

function FilterPlaylist() {
  return (
    <PlaylistContext.Consumer>
      {({ filters, onSelectedFilters }) => {
        return (
          <div className="filter-playlist">
            <span>Singer</span>
            <select
              className="form-select"
              aria-label="Default select example"
              name="singer"
              onChange={onSelectedFilters}
            >
              <option defaultValue>All</option>
              {filters.singers.map((singer) => (
                <option key={singer} value={singer}>
                  {singer}
                </option>
              ))}
            </select>

            <span>Genre</span>
            <select
              className="form-select"
              aria-label="Default select example"
              name="genre"
              onChange={onSelectedFilters}
            >
              <option defaultValue>All</option>
              {filters.genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            <span>Year</span>
            <select
              className="form-select"
              aria-label="Default select example"
              name="year"
              onChange={onSelectedFilters}
            >
              <option defaultValue>All</option>
              {filters.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        );
      }}
    </PlaylistContext.Consumer>
  );
}

export default FilterPlaylist;
