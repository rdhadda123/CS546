//import express, express router as shown in lecture code
import { Router } from "express";
const router = Router()
import bcrypt from "bcrypt"

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
