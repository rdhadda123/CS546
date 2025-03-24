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