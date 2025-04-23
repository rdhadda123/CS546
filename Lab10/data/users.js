import { checkName, checkPassword, checkQuote, checkRole, checkTheme, checkUserId, getSignupDate } from "../helpers.js";
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt"

//import mongo collections, bcrypt and implement the following data functions
export const register = async (
  firstName,
  lastName,
  userId,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  if (!firstName || !lastName || !userId || !password || !favoriteQuote || !themePreference || !role)
    throw "All fields need to have valid values"

  firstName = checkName(firstName)
  lastName = checkName(lastName)
  userId = checkUserId(userId)

  const userCollection = await users()
  const duplicateUser = await userCollection.findOne({userId: userId.toLowerCase()})

  if (duplicateUser)
    throw `User with id of ${userId} already exists`

  password = checkPassword(password)
  let hashedPassword = await bcrypt.hash(password, 16)

  favoriteQuote = checkQuote(favoriteQuote)
  themePreference = checkTheme(themePreference)
  role = checkRole(role)

  let newUser = {
    firstName: firstName,
    lastName: lastName,
    userId: userId,
    password: hashedPassword,
    favoriteQuote: favoriteQuote,
    themePreference: themePreference,
    role: role,
    signupDate: getSignupDate(),
    lastLogin: null
  }

  const insertInfo = await userCollection.insertOne(newUser)
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw `Could not add user with ID of ${userId}`
  
  return {registrationCompleted: true}
};

export const login = async (userId, password) => {};
