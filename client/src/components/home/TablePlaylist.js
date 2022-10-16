import React from "react";

function TablePlaylist({ playlist }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">
            Singer
            <div className="arrows">
              <div className="arrow-up"></div>
              <div className="arrow-down"></div>
            </div>
          </th>
          <th scope="col">
            Song
            <div className="arrows">
              <div className="arrow-up"></div>
              <div className="arrow-down"></div>
            </div>
          </th>
          <th scope="col">
            Genre
            <div className="arrows">
              <div className="arrow-up"></div>
              <div className="arrow-down"></div>
            </div>
          </th>
          <th scope="col">
            Year
            <div className="arrows">
              <div className="arrow-up"></div>
              <div className="arrow-down"></div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {playlist.map((music) => (
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
}

export default TablePlaylist;
