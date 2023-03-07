import { Request, Response } from "express";
import { getMusics, getQuantityMusics, getUniqueMusicTypes, postMusic } from "../models/playlist.model";

export type Query = {
  page?: number;
  perPage?: number;
  column?: "singer" | "song" | "genre" | "year";
  order?: "asc" | "desc";
};

export interface MusicProperties {
  singer: string;
  song: string;
  genre: string;
  year: number;
}

export type Filters = {
  singers?: string[];
  genres?: string[];
  years?: number[];
};

async function getPlaylistController(req: Request, res: Response) {
  const query: Query = req.query;
  const { page, perPage, column, order } = query;
  const filters: Filters = req.body;

  const playlist = await getMusics(page, perPage, column, order, filters);
  const quantity = await getQuantityMusics(filters);

  return res.status(200).json({
    status: "success",
    quantity,
    playlist,
  });
}

async function getUniqueMusicTypesController(req: Request, res: Response) {
  const uniqueTypes = await getUniqueMusicTypes();

  return res.status(200).json({
    status: "success",
    uniqueTypes,
  });
}

async function postMusicController(req: Request, res: Response) {
  const newMusic: MusicProperties = req.body;

  const response = await postMusic(newMusic);

  if (response) {
    return res.status(200).json({
      status: "success",
      music: response,
    });
  } else {
    return res.status(400).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
}

export { getPlaylistController, getUniqueMusicTypesController, postMusicController };
