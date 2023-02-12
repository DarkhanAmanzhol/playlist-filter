import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useQueries } from "react-query";
import { useSearchParams } from "react-router-dom";
import Loading from "../components/slider";

export interface ContextProps {
  playlist: Playlist[];
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  dataPerPage: number;
  setDataPerPage: React.Dispatch<React.SetStateAction<number>>;
  type: searchTypes;
  handleTypeChange: (nameColumn: string) => void;
  uniqueTypes: filterTypes;
  setSelectedFilters: React.Dispatch<React.SetStateAction<filterTypes>>;
  isFetching: boolean;
}

type Playlist = {
  playlistId: number;
  songId: number;
  song: {
    song_name: string;
    year: number;
    genre: {
      genre_name: string;
    };
    singer: {
      singer_name: string;
    };
  };
};

type searchTypes = {
  column: "singer" | "genre" | "year" | string;
  order: "asc" | "desc";
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
  setDataPerPage: () => {},
  type: { column: "singer", order: "asc" },
  handleTypeChange: () => {},
  uniqueTypes: { singers: [], genres: [], years: [] },
  setSelectedFilters: () => {},
  isFetching: true,
});

interface PlaylistProps {
  children: React.ReactNode;
}

type ResponseData = {
  quantity: number;
  playlist: Playlist[];
};

// Fetching data from API
const fetchMusicsByPage = async (
  page = 0,
  perPage = 25,
  column = "singer",
  order = "asc",
  filters: filterTypes
) => {
  console.log("Loading fetch 1");
  const response = await axios.post(
    `/api/playlist?page=${page}&perPage=${perPage}&column=${column}&order=${order}`,
    filters
  );

  console.log("Playlist:", response.data);

  return response.data as ResponseData;
};

const fetchUniqueTypes = async () => {
  console.log("Loading fetch 2");
  const response = await axios.get("/api/playlist/music-type-list");

  const uniqueTypes = response.data?.uniqueTypes as filterTypes;
  console.log("uniqueTypes:", uniqueTypes);
  return uniqueTypes;
};

function PlaylistContextProvider({ children }: PlaylistProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [dataPerPage, setDataPerPage] = useState(+(searchParams.get("perPage") || "25"));
  const [currentPage, setCurrentPage] = useState(+(searchParams.get("page") || "0"));
  const [type, setType] = useState({
    column: searchParams.get("column") || "singer",
    order: searchParams.get("order") || "asc",
  } as searchTypes);

  const [selectedFilters, setSelectedFilters] = useState({
    singers: [],
    genres: [],
    years: [],
  } as filterTypes);

  const handleTypeChange = (nameColumn: string) => {
    const newOrder = type.order === "asc" ? "desc" : "asc";

    setType((prevType) =>
      prevType.column === nameColumn
        ? { ...prevType, order: newOrder }
        : { column: nameColumn, order: "asc" }
    );
  };

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      perPage: dataPerPage.toString(),
      column: type.column.toString(),
      order: type.order.toString(),
    });
  }, [currentPage, dataPerPage, type]);

  const [playlistQuery, uniqueTypesQuery] = useQueries([
    {
      queryKey: ["playlist", currentPage, dataPerPage, type.column, type.order, selectedFilters],
      queryFn: () =>
        fetchMusicsByPage(currentPage, dataPerPage, type.column, type.order, selectedFilters),
    },
    {
      queryKey: ["music-type-list"],
      queryFn: fetchUniqueTypes,
    },
  ]);

  if (playlistQuery.isLoading && uniqueTypesQuery.isLoading) return <Loading />;

  const playlistValues: ContextProps = {
    playlist: playlistQuery.data?.playlist ?? [],
    pageCount: Math.ceil((playlistQuery.data?.quantity ?? 0) / dataPerPage),
    currentPage,
    setCurrentPage,
    dataPerPage,
    setDataPerPage,
    type,
    handleTypeChange,
    uniqueTypes: uniqueTypesQuery.data ?? { singers: [], genres: [], years: [] },
    setSelectedFilters,
    isFetching: playlistQuery.isFetching,
  };

  return <PlaylistContext.Provider value={playlistValues}>{children}</PlaylistContext.Provider>;
}

export default PlaylistContextProvider;
