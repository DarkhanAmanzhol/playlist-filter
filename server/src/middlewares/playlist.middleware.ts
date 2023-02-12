import { Request, Response, NextFunction } from "express";
import { Filters, Query } from "../controllers/playlist.controller";

export const playlistValidation = (req: Request, res: Response, next: NextFunction): void => {
  const filters: Filters = req.body;
  const query: Query = req.query;
  const { page, perPage, column, order } = query;

  if (typeof +page! !== "number")
    res.status(400).json({ status: "Failed", message: "Page type is not a number" });

  if (typeof +perPage! !== "number")
    res.status(400).json({ status: "Failed", message: "perPage type is not a number" });

  if (column !== "singer" && column !== "song" && column !== "genre" && column !== "year")
    res.status(400).json({ status: "Failed", message: "column should be singer or genre or year!" });

  if (order !== "asc" && order !== "desc")
    res.status(400).json({ status: "Failed", message: "order should be asc or desc" });

  if (!Array.isArray(filters.singers) || filters.singers.length === 0) delete filters.singers;
  if (!Array.isArray(filters.genres) || filters.genres.length === 0) delete filters.genres;
  if (!Array.isArray(filters.years) || filters.years.length === 0) delete filters.years;

  req.body = filters;

  next();
};
