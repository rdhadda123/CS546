//import express, express router as shown in lecture code
import { Router } from "express";
const router = Router()
import bcrypt from "bcrypt"
import { checkName, checkPassword, checkQuote, checkRole, checkTheme, checkUserId } from "../helpers.js";
import { login, register } from "../data/users.js";

router.route('/').get(async (req, res) => {
  //code here for GET
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
      const firstName = req.body.firstName
      const lastName = req.body.lastName
      const userId = req.body.userId;
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;
      const quote = req.body.favoriteQuote;
      const backgroundColor = req.body.backgroundColor;
      const fontColor = req.body.fontColor;
      const role = req.body.role;

      const missing = []
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
      const theme = {backgroundColor: backgroundColor, fontColor: fontColor}
      theme = checkTheme(theme)
      role = checkRole(role)

      const registered = await register(firstName, lastName, userId, password, quote, theme, role)
      if (registered.registrationCompleted){
        return res.redirect('/login')
      } else {
        return res.status(500).render('error', {error: "Internal Server Error"})
      }
    } catch (e) {
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
      const userId = req.body.userId
      const password = req.body.password
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
});

router.route('/superuser').get(async (req, res) => {
  //code here for GET
});

router.route('/signout').get(async (req, res) => {
  //code here for GET
});
