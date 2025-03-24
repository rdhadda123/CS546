//Export the following functions using ES6 Syntax

import {checkDateReleased, checkID, checkRuntime, checkString} from "../helpers";

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
  if (title.length < 2)
    throw `${title} needs to have length of 2 characters or more`
  else {
    for (let i = 0; i < title.length; i++){
      if (!/^[a-zA-Z0-9\s]+$/.test(title[i]))
        throw `${title} can only contain letters and numbers`
    }
  }

  //Validation for studio
  if (studio.length < 5)
    throw `${studio} needs to have length of 5 characters or more`
  else {
    for (let i = 0; i < studio.length; i++){
      if (!/^[a-zA-Z\s]+$/.test(studio[i]))
        throw `${studio[i]} can only contain letters and spaces`;
    }
  }

  //Validation for director
  const directorArray = director.split(" ")
  if (directorArray.length !== 2)
    throw `${director} needs to have first and last name`
  else {
    for (let i = 0; i < directorArray.length; i++){
      if (directorArray[i].length < 3)
        throw `${directorArray[i]} needs to have length of 3 characters or more`
      if (!/^[a-zA-Z\s]+$/.test(directorArray[i]))
        throw `${directorArray[i]} can only contain letters and spaces`;
    }
  }

  //Validation for rating
  if (!((rating === "G") || (rating === "PG") || (rating === "PG-13") || (rating === "R") || (rating === "NC-17")))
    throw `${rating} needs to be one of these values: G, PG, PG-13, R, NC-17`

  //Validation for genres
  if (!Array.isArray(genres))
    throw `${genres} is not an array`
  if (genres.length === 0)
    throw `${genres} needs have atleast one element`
  else {
    for (let i = 0; i < genres.length; i++){
      if (typeof genres[i] !== "string")
        throw `${genres[i]} needs to be a string`
      genres[i] = genres[i].trim()
      if (genres[i].length === 0)
        throw `${genres[i]} can't be an empty string`
      if (genres[i].length < 5)
        throw `${genres[i]} needs to have length of 5 characters or more`
      if (!/^[a-zA-Z\s]+$/.test(genres[i]))
        throw `${genres[i]} can only contain letters and spaces`;
    }
  }

  //Validation for castMembers
  if (!Array.isArray(castMembers))
    throw `${castMembers} is not an array`
  if (castMembers.length === 0)
    throw `${castMembers} needs have atleast one element`
  else {
    for (let i = 0; i < castMembers.length; i++){
      if (typeof castMembers[i] !== "string")
        throw `${castMembers[i]} needs to be a string`
      if (castMembers[i].trim().length === 0)
        throw `${castMembers[i]} can't be an empty string`
      let castArray = castMembers[i].split(" ")
      if (castArray.length !== 2)
        throw `${castMembers[i]} needs to have first and last name`
      else {
        for (let i = 0; i < castArray.length; i++){
          if (castArray[i].length < 3)
            throw `${castArray[i]} needs to have length of 3 characters or more`
          if (!/^[a-zA-Z\s]+$/.test(castArray[i]))
            throw `${castArray[i]} can only contain letters`
        }
      }
    }
  }

  dateReleased = checkDateReleased(dateReleased)
  runtime = checkRuntime(runtime)

  let newMovie = {
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

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  castMembers,
  dateReleased,
  runtime
) => {};

const renameMovie = async (id, newName) => {
  //Not used for this lab
};
