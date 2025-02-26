//export the following functions using ES6 syntax
import { movies } from "../config/mongoCollections";
import { ObjectId } from "mongodb";

export const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {};

export const getAllMovies = async () => {};

export const getMovieById = async (id) => {};

export const removeMovie = async (id) => {};

export const renameMovie = async (id, newName) => {};
