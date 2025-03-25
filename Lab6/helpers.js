//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { ObjectId } from "mongodb";

export const checkID = (id) => {
    if (!id) throw 'You must provide an id to search for'
    if (typeof id !== 'string') throw `${id} must be a string`
    id = id.trim()
    if (id.length === 0)
        throw `${id} cannot be an empty string or just spaces`
    if (!ObjectId.isValid(id)) throw 'invalid object ID'
    return id
}

export const checkString = (string) => {
    if (!string) throw 'You must provide a string'
    if (typeof string !== 'string') throw `${string} must be a string`
    string = string.trim()
    if (string.length === 0)
        throw `${string} cannot be an empty string or string with just spaces`

    return string
}

export const checkNumber = (number) => {
    if (!number) throw 'You must provide a number'
    if (typeof number != 'number') throw `${number} must be a number`

    return number
}

export const checkArray = (array) => {
    if (!array || !Array.isArray(array))
        throw `${array} is not an array`

    return array
}

export const checkTitle = (title) => {
    if (title.length < 2)
        throw `${title} needs to have length of 2 characters or more`
    else {
        for (let i = 0; i < title.length; i++){
            if (!/^[a-zA-Z0-9\s]+$/.test(title[i]))
                throw `${title} can only contain letters and numbers`
        }
    }

    return title
}
export const checkStudio = (studio) => {
    if (studio.length < 5)
        throw `${studio} needs to have length of 5 characters or more`
    else {
        for (let i = 0; i < studio.length; i++){
            if (!/^[a-zA-Z\s]+$/.test(studio[i]))
                throw `${studio[i]} can only contain letters and spaces`;
        }
    }

    return studio
}
export const checkDirector = (director) => {
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

    return director
}

export const checkRating = (rating) => {
    if (!((rating === "G") || (rating === "PG") || (rating === "PG-13") || (rating === "R") || (rating === "NC-17")))
        throw `${rating} needs to be one of these values: G, PG, PG-13, R, NC-17`

    return rating
}

export const checkGenres = (genres) => {
    genres = checkArray(genres)
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

    return genres
}

export const checkCastMembers = (castMembers) => {
    castMembers = checkArray(castMembers)
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

    return castMembers
}

export const checkDateReleased = (date) => {
    const dateArray = date.split("/")
    const validMonths = {"01" : 31, "02": 28, "03" : 31, "04" : 30, "05" : 31, "06" : 30, "07" : 31, "08" : 31, "09" : 30, "10" : 31, "11" : 30, "12" : 31}
    const currentYear = new Date().getFullYear()
    if (dateArray.length !== 3)
        throw `${date} does not have proper format: mm/dd/yyyy format`
    if (!(dateArray[0] in validMonths))
        throw `${dateArray[0]} is not a valid month`
    if (!(Number(dateArray[1]) >= 1 && Number(dateArray[1]) <= validMonths[dateArray[0]]))
        throw `There are not ${dateArray[1]} days in this month`
    if (!(Number(dateArray[2]) >= 1900 && Number(dateArray[2]) <= currentYear + 2))
        throw `${dateArray[2]} needs to be between 1900 and ${currentYear + 2}`

    return date
}

export const checkRuntime = (runtime) => {
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

    return runtime
}

export const checkReviewRating = (rating) => {
    rating = checkNumber(rating)
    if (rating < 1 || rating > 5)
        throw `${rating} needs to be between 1 and 5.`
    else {
        if (!Number.isInteger(rating) || !(/^\d\.\d$/.test(rating.toString()) && rating >= 1.5 && rating <= 4.8))
            throw `${rating} needs to be an integer or float between 1.5 and 4.8 with only one decimal place`
    }

    return rating
}