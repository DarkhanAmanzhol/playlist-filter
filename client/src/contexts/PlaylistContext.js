import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import Loading from "../components/slider";

export const PlaylistContext = createContext();

// Fetching data from API
const fetchMusicsByPage = async (
  page = 0,
  perPage = 20,
  column = "singer",
  order = "ASC",
  filters = []
) => {
  const response = await axios.post(
    `/api/playlist?page=${page}&perPage=${perPage}&column=${column}&order=${order}`,
    filters
  );

  return response.data;
};

function PlaylistContextProvider(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const dataPerPage = searchParams.get("perPage") || 20;
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 0);
  const [type, setType] = useState({
    column: searchParams.get("column") || "singer",
    order: searchParams.get("order") || "ASC",
  });

  const [selectedFilters, setSelectedFilters] = useState({
    singers: [],
    genres: [],
    years: [],
  });

  const handleTypeChange = (nameColumn) => {
    const newOrder = type.order === "ASC" ? "DESC" : "ASC";

    setType((prevType) =>
      prevType.column === nameColumn
        ? { ...prevType, order: newOrder }
        : { column: nameColumn, order: "ASC" }
    );
  };

  useEffect(() => {
    setSearchParams({
      page: currentPage,
      perPage: dataPerPage,
      column: type.column,
      order: type.order,
    });
  }, [currentPage, dataPerPage, type]);

  const { data, isLoading } = useQuery(
    ["playlist", currentPage, type.column, type.order, selectedFilters],
    () => fetchMusicsByPage(currentPage, dataPerPage, type.column, type.order, selectedFilters),
    { keepPreviousData: true }
  );

  if (isLoading) return <Loading />;

  const playlist = data.playlist;
  const quantity = data.quantity;
  const uniqueTypes = data.uniqueTypes;

  const pageCount = Math.ceil(quantity / dataPerPage);

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        pageCount,
        currentPage,
        setCurrentPage,
        dataPerPage,
        type,
        handleTypeChange,
        uniqueTypes,
        setSelectedFilters,
      }}
    >
      {props.children}
    </PlaylistContext.Provider>
  );
}

export default PlaylistContextProvider;
