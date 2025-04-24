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
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    res.render('')
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
