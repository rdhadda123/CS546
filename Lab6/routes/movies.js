//require express and express router as shown in lecture code
import express from 'express'
import { movieData } from '../data/index.js';

const router = express.Router()
router
  .route('/')
  .get(async (req, res) => {
    try{
      const movieList = await movieData.getAllMovies()
      const formatMovies = movieList.map(({_id, title}) => ({_id, title}))
      res.json(formatMovies)
    } catch (e) {
      return res.status(500).send(e)
    }
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  })
  .put(async (req, res) => {
    //code here for PUT
  });
