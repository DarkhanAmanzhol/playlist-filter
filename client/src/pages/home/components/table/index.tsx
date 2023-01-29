import React, { useContext } from "react";
import "./style.css";
import { PlaylistContext } from "contexts/PlaylistContext";
import { ArrowSort } from "components/arrow-sort";
import ReactPaginate from "react-paginate";
import Loading from "components/slider";

function Table() {
  const {
    playlist,
    pageCount,
    currentPage,
    setCurrentPage,
    dataPerPage,
    setDataPerPage,
    type,
    handleTypeChange,
    isPlaylistLoading,
  } = useContext(PlaylistContext);

  return playlist.length ? (
    <section id="home-table">
      <table className="table table-striped playlist-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              Singer
              <ArrowSort nameColumn={"singer"} type={type} onChangeType={handleTypeChange} />
            </th>
            <th scope="col">
              Song
              <ArrowSort nameColumn={"song"} type={type} onChangeType={handleTypeChange} />
            </th>
            <th scope="col">
              Genre
              <ArrowSort nameColumn={"genre"} type={type} onChangeType={handleTypeChange} />
            </th>
            <th scope="col">
              Year
              <ArrowSort nameColumn={"year"} type={type} onChangeType={handleTypeChange} />
            </th>
          </tr>
        </thead>
        <tbody>
          {playlist &&
            playlist.map((music, index) => (
              <tr key={music.id}>
                <td>{index + 1 + currentPage * dataPerPage}</td>
                <td>{music.singer}</td>
                <td>{music.song}</td>
                <td>{music.genre}</td>
                <td>{music.year}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="page-navigation">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => setCurrentPage(e.selected)}
          forcePage={currentPage | 0}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={() => null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="page-num active"
        />
        {isPlaylistLoading ? (
          <div className="page-navigation__per-page">
            {[10, 25, 50, 100].map((number) => (
              <span
                className={number === dataPerPage ? "active" : ""}
                key={number}
                onClick={(element) => setDataPerPage(+(element.target as HTMLButtonElement).innerHTML)}
              >
                {number}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  ) : (
    <Loading />
  );
}

export default Table;
