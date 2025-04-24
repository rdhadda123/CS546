import { checkName, checkPassword, checkQuote, checkRole, checkTheme, checkUserId, getLastLogin, getSignupDate } from "../helpers.js";
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

export const login = async (userId, password) => {
  if (!userId || !password)
    throw "All fields need to have valid values"
  userId = checkUserId(userId)
  password = checkPassword(password)

  const userCollection = await users()
  const user = await userCollection.findOne({userId: userId.toLowerCase()})

  if (!user)
    throw "Either the userId or password is invalid"

  const matchedPassword = await bcrypt.compare(password, user.password)
  if (matchedPassword){
     const returnedObj = {
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user.userId,
      favoriteQuote: user.favoriteQuote,
      themePreference: user.themePreference,
      role: user.role,
      signupDate: user.signupDate,
      lastLogin: getLastLogin()
     }
     return returnedObj
  } else {
    throw "Either the userId or password is invalid"
  }

};
