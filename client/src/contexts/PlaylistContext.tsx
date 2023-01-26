import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import Loading from "../components/slider";

export interface ContextProps {
  playlist: Playlist[];
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  dataPerPage: number;
  type: searchTypes;
  handleTypeChange: (nameColumn: string) => void;
  uniqueTypes: filterTypes;
  setSelectedFilters: React.Dispatch<React.SetStateAction<filterTypes>>;
}

type Playlist = {
  id: number;
  singer: string;
  song: string;
  genre: string;
  year: number;
};

type searchTypes = {
  column: "singer" | "genre" | "year" | string;
  order: "ASC" | "DESC" | string;
};

type filterTypes = {
  singers: string[];
  genres: string[];
  years: string[];
};

export const PlaylistContext = createContext<ContextProps>({
  playlist: [],
  pageCount: 0,
  currentPage: 0,
  setCurrentPage: () => {},
  dataPerPage: 0,
  type: { column: "singer", order: "ASC" },
  handleTypeChange: () => {},
  uniqueTypes: { singers: [], genres: [], years: [] },
  setSelectedFilters: () => {},
});

interface PlaylistProps {
  children: React.ReactNode;
}

type ResponseData = {
  quantity: number;
  playlist: Playlist[];
  uniqueTypes: filterTypes;
};

// Fetching data from API
const fetchMusicsByPage = async (
  page = 0,
  perPage = 20,
  column = "singer",
  order = "ASC",
  filters: filterTypes
) => {
  const response = await axios.post(
    `/api/playlist?page=${page}&perPage=${perPage}&column=${column}&order=${order}`,
    filters
  );

  return response.data as ResponseData;
};

function PlaylistContextProvider({ children }: PlaylistProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const dataPerPage = parseInt(searchParams.get("perPage") || "20");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "0"));
  const [type, setType] = useState({
    column: searchParams.get("column") || "singer",
    order: searchParams.get("order") || "ASC",
  } as searchTypes);

  const [selectedFilters, setSelectedFilters] = useState({
    singers: [],
    genres: [],
    years: [],
  } as filterTypes);

  const handleTypeChange = (nameColumn: string) => {
    const newOrder = type.order === "ASC" ? "DESC" : "ASC";

    setType((prevType) =>
      prevType.column === nameColumn
        ? { ...prevType, order: newOrder }
        : { column: nameColumn, order: "ASC" }
    );
  };

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      perPage: dataPerPage.toString(),
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

  const playlistValues: ContextProps = {
    playlist: data?.playlist ?? [],
    pageCount: Math.ceil((data?.quantity ?? 0) / dataPerPage),
    currentPage,
    setCurrentPage,
    dataPerPage,
    type,
    handleTypeChange,
    uniqueTypes: data?.uniqueTypes ?? { singers: [], genres: [], years: [] },
    setSelectedFilters,
  };

  return <PlaylistContext.Provider value={playlistValues}>{children}</PlaylistContext.Provider>;
}

export default PlaylistContextProvider;
