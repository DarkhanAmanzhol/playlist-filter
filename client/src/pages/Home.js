import React, { useEffect, useState } from "react";
import TablePlaylist from "../components/home/TablePlaylist";
import FilterPlaylist from "../components/home/FilterPlaylist";
import "./Home.css";
import axios from "axios";

function Home() {
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    const fetchPlaylist = async () => {
      const response = await axios.get("/api/playlist");
      const playlistData = response.data.playlist;
      setPlaylist(playlistData);
    };

    fetchPlaylist();
  }, []);
  return (
    <section className="home">
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h3>Playlist</h3>
            <TablePlaylist playlist={playlist} />
          </div>
          <div className="col-2">
            <h3>Filter</h3>
            <FilterPlaylist playlist={playlist} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
