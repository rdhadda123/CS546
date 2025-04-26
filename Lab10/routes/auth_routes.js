//import express, express router as shown in lecture code
import { Router } from "express";
const router = Router()
import bcrypt from "bcrypt"
import { checkName, checkPassword, checkQuote, checkRole, checkTheme, checkUserId } from "../helpers.js";
import { login, register } from "../data/users.js";

router.route('/').get(async (req, res) => {
  //code here for GET
  try {
    const user = req.session.user || null
    const isSuperUser = user && user.role === "superuser"
    const themePreference = user ? user.themePreference : { backgroundColor: 'white', fontColor: 'black' }
    return res.render('home', {
      user: user,
      isSuperUser: isSuperUser,
      themePreference: themePreference
    })
  } catch (e) {
    return res.status(500).render('error', { error: 'Internal Server Error' })
  }
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    try {
      return res.render('register')
    } catch (e) {
      return res.status(500).json({error: e})
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      let firstName = req.body.firstName
      let lastName = req.body.lastName
      let userId = req.body.userId;
      let password = req.body.password;
      let confirmPassword = req.body.confirmPassword;
      let quote = req.body.favoriteQuote;
      let backgroundColor = req.body.backgroundColor;
      let fontColor = req.body.fontColor;
      let role = req.body.role;

      let missing = []
      if (!firstName)
        missing.push("firstName")
      if (!lastName)
        missing.push("lastName")
      if (!userId)
        missing.push("userId")
      if (!password)
        missing.push("password")
      if (!confirmPassword)
        missing.push("confirmPassword")
      if (!quote)
        missing.push("quote")
      if (!backgroundColor)
        missing.push("backgroundColor")
      if (!fontColor)
        missing.push("fontColor")
      if (!role)
        missing.push("role")

      if (missing.length > 0){
        return res.status(400).render('register', {
          error: `The missing fields are: ${missing.join(", ")}`
        })
      }

      firstName = checkName(firstName)
      lastName = checkName(lastName)
      userId = checkUserId(userId)
      password = checkPassword(password)
      confirmPassword = checkPassword(confirmPassword)

      if (password !== confirmPassword){
        return res.status(400).render('register', {
          error: "The passwords do not match"
        })
      }
      
      quote = checkQuote(quote)
      let theme = {backgroundColor: backgroundColor, fontColor: fontColor}
      theme = checkTheme(theme)
      role = checkRole(role)

      const registered = await register(firstName, lastName, userId, password, quote, theme, role)
      if (registered.registrationCompleted){
        return res.redirect('/login')
      } else {
        return res.status(500).render('error', {error: "Internal Server Error"})
      }
    } catch (e) {
      console.log(e)
      return res.status(400).render('register', { error: e }) 
    }
     
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    try {
      return res.render('login')
    } catch (e) {
      return res.status(500).json({error: e})
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try{
      let userId = req.body.userId
      let password = req.body.password
      if (!userId || !password){
        return res.status(400).render('login', {
          error: 'UserId or password not provided'
        })
      }

      userId = checkUserId(userId)
      password = checkPassword(password)

      const user = await login(userId, password)
        
      req.session.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user.userId,
        favoriteQuote: user.favoriteQuote,
        themePreference: user.themePreference,
        role: user.role,
        signupDate: user.signupDate,
        lastLogin: user.lastLogin
      }

      if (user.role === "superuser"){
        return res.redirect('/superuser')
      } else if (user.role === "user"){
        return res.redirect('/user')
      }
    } catch (e) {
      return res.status(400).render('login', { error: e })
    }
  });

router.route('/user').get(async (req, res) => {
  //code here for GET
  try {
    const currentTime = new Date().toLocaleTimeString()
    const currentDate = new Date().toLocaleDateString()

    const user = req.session.user
    const themePreference = user ? user.themePreference : { backgroundColor: 'white', fontColor: 'black' }

    res.render('user', {
      firstName: user.firstName,
      lastName: user.lastName,
      currentTime: currentTime,
      currentDate: currentDate,
      role: user.role,
      signupDate: user.signupDate,
      lastLogin: user.lastLogin,
      favoriteQuote: user.favoriteQuote,
      isSuperUser: user.role === "superuser",
      themePreference: themePreference
    })
  } catch (e) {
    return res.status(400).render('error', {error: e})
  }
});

router.route('/superuser').get(async (req, res) => {
  //code here for GET
  try {
    const currentTime = new Date().toLocaleTimeString()
    const currentDate = new Date().toLocaleDateString()

    const user = req.session.user
    const themePreference = user ? user.themePreference : { backgroundColor: 'white', fontColor: 'black' }

    res.render('superuser', {
      firstName: user.firstName,
      lastName: user.lastName,
      currentTime: currentTime,
      currentDate: currentDate,
      signupDate: user.signupDate,
      lastLogin: user.lastLogin,
      favoriteQuote: user.favoriteQuote,
      themePreference: themePreference
    })
  } catch (e) {
    return res.status(400).render('error', {error: e})
  }
});

router.route('/signout').get(async (req, res) => {
  //code here for GET
  try {
    req.session.destroy()
    res.render('signout')
  } catch (e) {
    return res.status(500).render('error', { error: 'Internal Server Error' })
  }
});

export default router