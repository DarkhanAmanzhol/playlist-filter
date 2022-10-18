import React, { useEffect, useRef, useState } from "react";
import { PlaylistContext } from "../../contexts/PlaylistContext";
import ArrowSortPlaylist from "../playlists/ArrowSortPlaylist";

function TablePlaylist() {
  const [type, setType] = useState({ name: "singer", order: 1 });

  const prevType = useRef("singer");

  // To check prev type and current, if they are not equal, then order should be start from ASC order, otherwise DESC order
  useEffect(() => {
    if (prevType.current !== type.name) {
      setType({ ...type, order: 1 });
    }
  }, [type]);

  return (
    <PlaylistContext.Consumer>
      {({ playlist }) => {
        return (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">
                  Singer
                  <ArrowSortPlaylist
                    nameColumn={"singer"}
                    type={type}
                    prevType={prevType}
                    setType={setType}
                  />
                </th>
                <th scope="col">
                  Song
                  <ArrowSortPlaylist
                    nameColumn={"song"}
                    type={type}
                    prevType={prevType}
                    setType={setType}
                  />
                </th>
                <th scope="col">
                  Genre
                  <ArrowSortPlaylist
                    nameColumn={"genre"}
                    type={type}
                    prevType={prevType}
                    setType={setType}
                  />
                </th>
                <th scope="col">
                  Year
                  <ArrowSortPlaylist
                    nameColumn={"year"}
                    type={type}
                    prevType={prevType}
                    setType={setType}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {playlist
                .sort((music1, music2) => {
                  if (type.name === "year") {
                    return (music1.year - music2.year) * type.order;
                  } else {
                    return (
                      music1[type.name].localeCompare(music2[type.name]) *
                      type.order
                    );
                  }
                })
                .map((music) => (
                  <tr key={music.id}>
                    <td>{music.id}</td>
                    <td>{music.singer}</td>
                    <td>{music.song}</td>
                    <td>{music.genre}</td>
                    <td>{music.year}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        );
      }}
    </PlaylistContext.Consumer>
  );
}

export default TablePlaylist;
