//require express and express router as shown in lecture code
import express from 'express'
import { reviewData } from '../data/index.js';
import { movieData } from '../data/index.js';
import { checkID } from "../helpers";

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.movieId = checkID(movieId)
    } catch (e) {
      return res.status(400).json({error: e})
    }
    
    try {
      await movieData.getMovieById(req.params.movieId)
    } catch (e) {
      return res.status(404).send(e)
    }

    try {
      let review = await reviewData.getAllReviews(req.params.movieId)
      return res.json(review)
    } catch (e) {
      return res.status(404).send(e)
    }
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  });
