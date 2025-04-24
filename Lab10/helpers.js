//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { ObjectId } from "mongodb";

export const checkString = (string) => {
    if (!string) throw 'You must provide a string'
    if (typeof string !== 'string') throw `${string} must be a string`
    string = string.trim()
    if (string.length === 0)
        throw `${string} cannot be an empty string or string with just spaces`
    return string
}

export const checkID = (id) => {
    if (!id) throw 'You must provide an id to search for'
    if (typeof id !== 'string') throw `${id} must be a string`
    id = id.trim()
    if (id.length === 0)
        throw `${id} cannot be an empty string or just spaces`
    if (!ObjectId.isValid(id)) throw 'invalid object ID'
    return id
}

export const checkName = (name) => {
    name = checkString(name)
    if (!/^[A-Za-z]+$/.test(name))
        throw `${name} can only have letters with no spaces or numbers`
    if (name.length < 2 || name.length > 20)
        throw `${name} must be between 2 and 20 characters long`
    return name
}

export const checkUserId = (userId) => {
    userId = checkString(userId)
    if (!/^[A-Za-z0-9]+$/.test(userId))
        throw `${userId} can only have letters or positive numbers with no spaces`
    if (userId.length < 5 || userId.length > 10)
        throw `${userId} must be between 5 and 10 characters long`
    return userId
}

export const checkPassword = (password) => {
    password = checkString(password)
    if (password.includes(' '))
        throw `${password} can't contain spaces`
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(password))
        throw `${password} needs to have atleast one uppercase letter, one number, and one special character`
    if (password.length < 8)
        throw `${password} needs to be at least 8 characters long`
    return password
}

export const checkQuote = (quote) => {
    quote = checkString(quote)
    if (quote.length < 20 || quote.length > 255)
        throw `${quote} must be between 20 and 255 characters long`
    return quote 
}

export const checkTheme = (theme) => {
    if (typeof theme !== "object" || theme === null)
        throw `${theme} must be an object`
    if (Object.keys(theme).length !== 2)
        throw `${theme} must have two fields`
    if (!Object.keys(theme).includes("backgroundColor"))
        throw `${theme} must have backgroundColor field`
    if (!Object.keys(theme).includes("fontColor"))
        throw `${theme} must be have fontColor field`

    if (typeof theme.backgroundColor !== "string" || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(theme.backgroundColor))
        throw `${theme.backgroundColor} is not a valid hex color`
    if (typeof theme.fontColor !== "string" || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(theme.fontColor))
        throw `${theme.fontColor} is not a valid hex color`
    if (theme.backgroundColor.toLowerCase() === theme.fontColor.toLowerCase())
        throw `the background color and font color can not be the same`
    return theme
    
}

export const checkRole = (role) => {
    role = checkString(role)
    if (role.toLowerCase() !== "user" && role.toLowerCase() !== "superuser")
        throw `${role} needs to be either user or superuser`
    return role
}

export function getSignupDate() {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()

    return `${month}/${day}/${year}`
}

export function getLastLogin() {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()

    let hours = now.getHours()
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12
    const formattedHour = String(hours).padStart(2, '0')

    return `${month}/${day}/${year} ${formattedHour}:${minutes}${ampm}`
}