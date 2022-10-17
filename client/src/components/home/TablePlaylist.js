import React, { useState } from "react";
import { PlaylistContext } from "../../contexts/PlaylistContext";

function TablePlaylist() {
  const [type, setType] = useState({ name: "singer", order: 1 });
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
                  <div
                    className="arrows"
                    onClick={() =>
                      setType({ name: "singer", order: type.order * -1 })
                    }
                  >
                    <div
                      className="arrow-up"
                      style={
                        type.order === 1 && type.name === "singer"
                          ? {
                              width: "100%",
                              height: "100%",
                              visibility: "hidden",
                            }
                          : {
                              visibility: "visible",
                            }
                      }
                    ></div>
                    <div
                      className="arrow-down"
                      style={
                        type.order === -1 && type.name === "singer"
                          ? {
                              width: "100%",
                              height: "100%",
                              visibility: "hidden",
                            }
                          : {
                              visibility: "visible",
                            }
                      }
                    ></div>
                  </div>
                </th>
                <th scope="col">
                  Song
                  <div
                    className="arrows"
                    onClick={() =>
                      setType({ name: "song", order: type.order * -1 })
                    }
                  >
                    <div
                      className="arrow-up"
                      style={{
                        visibility:
                          type.order === 1 && type.name === "song"
                            ? "hidden"
                            : "visible",
                      }}
                    ></div>
                    <div
                      className="arrow-down"
                      style={{
                        visibility:
                          type.order === -1 && type.name === "song"
                            ? "hidden"
                            : "visible",
                      }}
                    ></div>
                  </div>
                </th>
                <th scope="col">
                  Genre
                  <div
                    className="arrows"
                    onClick={() =>
                      setType({ name: "genre", order: type.order * -1 })
                    }
                  >
                    <div
                      className="arrow-up"
                      style={{
                        visibility:
                          type.order === 1 && type.name === "genre"
                            ? "hidden"
                            : "visible",
                      }}
                    ></div>
                    <div
                      className="arrow-down"
                      style={{
                        visibility:
                          type.order === -1 && type.name === "genre"
                            ? "hidden"
                            : "visible",
                      }}
                    ></div>
                  </div>
                </th>
                <th scope="col">
                  Year
                  <div
                    className="arrows"
                    onClick={() =>
                      setType({ name: "year", order: type.order * -1 })
                    }
                  >
                    <div
                      className="arrow-up"
                      style={{
                        visibility:
                          type.order === 1 && type.name === "year"
                            ? "hidden"
                            : "visible",
                      }}
                    ></div>
                    <div
                      className="arrow-down"
                      style={{
                        visibility:
                          type.order === -1 && type.name === "year"
                            ? "hidden"
                            : "visible",
                      }}
                    ></div>
                  </div>
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
