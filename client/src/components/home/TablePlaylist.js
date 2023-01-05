// css is global path: /client/src/pages/Home.css
import React, { useContext } from "react";
import { PlaylistContext } from "../../contexts/PlaylistContext";
import ArrowSortPlaylist from "../playlists/ArrowSortPlaylist";
import ReactPaginate from "react-paginate";

function TablePlaylist() {
  const {
    playlist,
    pageCount,
    currentPage,
    setCurrentPage,
    dataPerPage,
    type,
    handleTypeChange,
  } = useContext(PlaylistContext);

  return (
    <>
      <table className='table table-striped playlist-table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>
              Singer
              <ArrowSortPlaylist
                nameColumn={"singer"}
                type={type}
                onChangeType={handleTypeChange}
              />
            </th>
            <th scope='col'>
              Song
              <ArrowSortPlaylist
                nameColumn={"song"}
                type={type}
                onChangeType={handleTypeChange}
              />
            </th>
            <th scope='col'>
              Genre
              <ArrowSortPlaylist
                nameColumn={"genre"}
                type={type}
                onChangeType={handleTypeChange}
              />
            </th>
            <th scope='col'>
              Year
              <ArrowSortPlaylist
                nameColumn={"year"}
                type={type}
                onChangeType={handleTypeChange}
              />
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
      <ReactPaginate
        breakLabel='...'
        nextLabel='next >'
        onPageChange={(e) => setCurrentPage(e.selected)}
        forcePage={currentPage}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel='< previous'
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='page-num active'
      />
    </>
  );
}

export default TablePlaylist;
