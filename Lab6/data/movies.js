//Export the following functions using ES6 Syntax

import { ObjectId, ReturnDocument } from "mongodb";
import { movies } from "../config/mongoCollections.js";
import {checkArray, checkCastMembers, checkDateReleased, checkDirector, checkGenres, checkID, checkRating, checkRuntime, checkString, checkStudio, checkTitle} from "../helpers";

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
) => {
  if (!title || !plot || !genres || !rating ||!studio || !director || !castMembers || !dateReleased || !runtime)
    throw "All fields need to have valid values"
  title = checkString(title)
  plot = checkString(plot)
  rating = checkString(rating)
  studio = checkString(studio)
  director = checkString(director)
  dateReleased = checkString(dateReleased)
  runtime = checkString(runtime)

  //Validation for title
  title = checkTitle(title)

  //Validation for studio
  studio = checkStudio(studio)

  //Validation for director
  director = checkDirector(director)

  //Validation for rating
  rating = checkRating(rating)

  //Validation for genres
  genres = checkGenres(genres)

  //Validation for castMembers
  castMembers = checkCastMembers(castMembers)

  //Validation for date released
  dateReleased = checkDateReleased(dateReleased)

  //Validation for runtime
  runtime = checkRuntime(runtime)

  //Ask if we add reviews and overallRating here
  let newMovie = {
      title: title,
      plot: plot,
      genres: genres,
      rating: rating,
      studio: studio,
      director: director,
      castMembers: castMembers,
      dateReleased: dateReleased,
      runtime: runtime,
      reviews:[],
      overallRating: 0
    }
  
  const movieCollection = await movies()
  const insertInfo = await movieCollection.insertOne(newMovie)
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add movie'

  const newID = insertInfo.insertedId.toString()
  const movie = await getMovieById(newID)

  return movie

};

export const getAllMovies = async () => {
  const movieCollection = await movies()
  let movieList = await movieCollection.find({}).toArray()
  if (!movieList) throw 'Could not get all movies'
  movieList = movieList.map((element) => {
    element._id = element._id.toString()
    return element
  })

  return movieList
};

export const getMovieById = async (movieId) => {
  movieId = checkID(movieId)

  const movieCollection = await movies()
  const movie = await movieCollection.findOne({_id: new ObjectId(id)})
  if (movie === null) throw 'No movie with that id'
  movie._id = movie._id.toString()
  return movie
};

export const removeMovie = async (movieId) => {
  movieId = checkID(movieId)

  const movieCollection = await movies();
  const deletionInfo = await movieCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });

  if (!deletionInfo) {
    throw `Could not delete movie with id of ${id}`;
  }
  return `${deletionInfo.title} has been successfully deleted!`;
};

export const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  if (!movieId || !title || !plot || !genres || !rating ||!studio || !director || !castMembers || !dateReleased || !runtime)
    throw "All fields need to have valid values"
  movieId = checkString(movieId)
  title = checkString(title)
  plot = checkString(plot)
  rating = checkString(rating)
  studio = checkString(studio)
  director = checkString(director)
  dateReleased = checkString(dateReleased)
  runtime = checkString(runtime)

  //Check if movieId is a valid ID
  movieId = checkID(movieId)

  //Validation check for genres
  genres = checkGenres(genres)

  //Validation for castMembers
  castMembers = checkCastMembers(castMembers)

  //Validation for dateReleased
  dateReleased = checkDateReleased(dateReleased)

  //Validation for runtime
  runtime = checkRuntime(runtime)

  let updatedMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime
  }

  const movieCollection = await movies()
  const updatedInfo = await movieCollection.findOneAndUpdate(
    {_id: new ObjectId(movieId)},
    {$set: updatedMovie},
    {returnDocument: 'after'}
  )

  if (!updatedInfo)
    throw 'Could not update movie successfully'
  
  return updatedInfo
};

const renameMovie = async (id, newName) => {
  //Not used for this lab
};
