import React from "react";
import Table from "./components/table";
import Filter from "./components/filter";
import "./style.css";

function Home() {
  return (
    <section className="home">
      <div className="container">
        <div className="row">
          <div className="col-9">
            <h3>Playlist</h3>
            <Table />
          </div>
          <div className="col-3">
            <h3>Filter</h3>
            <Filter />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
