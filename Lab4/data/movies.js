//export the following functions using ES6 syntax
import { movies } from "../config/mongoCollections.js";
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
) => {
  //Validation for all inputs
  if (!title || !plot || !genres || !rating ||!studio || !director || !castMembers || !dateReleased || !runtime)
    throw "All fields need to have valid values"

  //Validation for all string inputs
  if (typeof title !== "string" || typeof plot !== "string" || typeof rating !== "string" || typeof studio !== "string" || 
    typeof director !== "string" || typeof dateReleased !== "string" || typeof runtime !== "string" )
    throw "Parameter needs to be a string"

  //Trimming all string inputs
  title= title.trim()
  plot = plot.trim()
  rating = rating.trim()
  studio = studio.trim()
  director = director.trim()
  dateReleased = dateReleased.trim()
  runtime = runtime.trim()

  //Validation for empty strings
  if (title.length === 0 || plot.length === 0 || rating.length === 0 || studio.length === 0 || director.length === 0 || dateReleased.length === 0 || runtime.length === 0)
    throw "Parameters can't be empty strings"

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

  //Validation for dateReleased
  const dateArray = dateReleased.split("/")
  const validMonths = {"01" : 31, "02": 28, "03" : 31, "04" : 30, "05" : 31, "06" : 30, "07" : 31, "08" : 31, "09" : 30, "10" : 31, "11" : 30, "12" : 31}
  const currentYear = new Date().getFullYear()
  if (dateArray.length !== 3)
    throw `${dateReleased} does not have proper format: mm/dd/yyyy format`
  if (!(dateArray[0] in validMonths))
    throw `${dateArray[0]} is not a valid month`
  if (!(Number(dateArray[1]) >= 1 && Number(dateArray[1]) <= validMonths[dateArray[0]]))
    throw `There are not ${dateArray[1]} days in this month`
  if (!(Number(dateArray[2]) >= 1900 && Number(dateArray[2]) <= currentYear + 2))
    throw `${dateArray[2]} needs to be between 1900 and ${currentYear + 2}`

  //Validation for runtime
  const runtimeArray = runtime.split(" ")
  let hour = Number(runtimeArray[0].substring(0, runtimeArray[0].length - 1))
  let minutes = Number(runtimeArray[1].substring(0, runtimeArray[1].length - 3))
  if (runtimeArray[0].substring(runtimeArray[0].length - 1) !== 'h')
    throw `${runtime} is not in proper format: #h #min`
  if (!(Number.isInteger(hour) && hour >= 0))
    throw `${hour} is not a valid hour`
  if (runtimeArray[1].substring(runtimeArray[1].length - 3) !== 'min')
    throw `${runtime} is not in proper format: #h #min`
  if (!(Number.isInteger(minutes) && (minutes >= 0 && minutes <= 59)))
    throw `${minutes} is not valid minutes`
  if (hour === 0){
    if (minutes < 31)
      throw `${hour} is not a valid hour if movie is not longer than 30 minutes` 
  }

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

export const getMovieById = async (id) => {
  if (!id) throw 'You must provide an id to search for'
  if (typeof id !== 'string') throw 'Id must be a string'
  id = id.trim()
  if (id.length === 0)
    throw 'Id cannot be an empty string or just spaces'
  if (!ObjectId.isValid(id)) throw 'invalid object ID'
  
  const movieCollection = await movies()
  const movie = await movieCollection.findOne({_id: new ObjectId(id)})
  if (movie === null) throw 'No movie with that id'
  movie._id = movie._id.toString()
  return movie
  
};

export const removeMovie = async (id) => {
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  id = id.trim()
  if (id.length === 0)
    throw 'Id cannot be an empty string or just spaces';
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const movieCollection = await movies();
  const deletionInfo = await movieCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });

  if (!deletionInfo) {
    throw `Could not delete movie with id of ${id}`;
  }
  return `${deletionInfo.title} has been successfully deleted!`;
};

export const renameMovie = async (id, newName) => {
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  id = id.trim()
  if (id.length === 0)
    throw 'Id cannot be an empty string or just spaces';
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  if (!newName) throw 'You must provide a new name for your movie';
  if (typeof newName !== 'string') throw `${newName} must be a string`;
  newName = newName.trim()
  if (newName.length === 0)
    throw `${newName} cannot be an empty string or string with just spaces`;
  if (newName.length < 2)
    throw `${newName} needs to have length of 2 characters or more`
  else {
    for (let i = 0; i < newName.length; i++){
      if (!/^[a-zA-Z0-9\s]+$/.test(newName[i]))
        throw `${newName} can only contain letters and numbers`
    }
  }
  const movieCollection = await movies()
  const movie = await movieCollection.findOne({_id: new ObjectId(id)})
  if (movie === null) throw 'No movie with that id'
  if (movie.title === newName) throw `${newName} is the same as ${movie.title}`

  const updatedMovie = {
    title: newName
  }

  const updatedInfo = await movieCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: updatedMovie},
    {returnDocument: 'after'}
  );

  if (!updatedInfo) {
    throw 'could not update movie successfully';
  }
  updatedInfo._id = updatedInfo._id.toString();
  return updatedInfo;
};
  
