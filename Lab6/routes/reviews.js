//require express and express router as shown in lecture code
import express from 'express'
import { reviewData } from '../data/index.js';
import { movieData } from '../data/index.js';
import { checkID, checkReviewRating, checkString } from "../helpers.js";

const router = express.Router()
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
    let reviewInfo = req.body
    if (!reviewInfo || reviewInfo.length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'})
    }

    try {
      reviewInfo._id = checkID(req.params.movieId)
      reviewInfo.reviewTitle = checkString(reviewInfo.reviewTitle)
      reviewInfo.reviewerName = checkString(reviewInfo.reviewerName)
      reviewInfo.review = checkString(reviewInfo.review)
      reviewInfo.rating = checkReviewRating(reviewInfo.rating)
    } catch (e) {
      return res.status(400).json({error: e})
    }

    try {
      await movieData.getMovieById(req.params.movieId)
    } catch (e) {
      return res.status(404).send(e)
    }

    try {
      let newReview = await reviewData.createReview(
        req.params.movieId,
        reviewInfo.reviewTitle,
        reviewInfo.reviewerName,
        reviewInfo.review,
        reviewInfo.rating
      )
      return res.json(newReview)
    } catch (e) {
      return res.status(500).json({error: e})
    }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.reviewId = checkID(reviewId)
    } catch (e) {
      return res.status(400).json({error: e})
    }

    try {
      let review = await reviewData.getReview(req.params.reviewId)
      return res.json(review)
    } catch (e) {
      return res.status(404).send(e)
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.reviewId = checkID(reviewId)
    } catch (e) {
      return res.status(400).json({error: e})
    }

    try {
      await reviewData.getReview(req.params.reviewId)
    } catch (e) {
      return res.status(404).send(e)
    }

    try {
      let deletedReview = await reviewData.removeReview(req.params.reviewId)
      return res.json(deletedReview)
    } catch (e) {
      return res.status(404).send(e)
    }
  });

  export default router;