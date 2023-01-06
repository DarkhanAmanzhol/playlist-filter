import React from "react";
import TablePlaylist from "../components/home/TablePlaylist";
import FilterPlaylist from "../components/home/FilterPlaylist";
import "./Home.css";

function Home() {
  return (
    <section className='home'>
      <div className='container'>
        <div className='row'>
          <div className='col-9'>
            <h3>Playlist</h3>
            <TablePlaylist />
          </div>
          <div className='col-3'>
            <h3>Filter</h3>
            <FilterPlaylist />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
