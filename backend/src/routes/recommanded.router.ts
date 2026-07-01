import { Router } from "express";
import { recomendedMovies } from "../controllers/recommanded.controller";

export const recommededRouter = Router()

recommededRouter.post("/movies", recomendedMovies)