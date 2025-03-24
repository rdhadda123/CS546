//Export the following functions using ES6 Syntax

import { ObjectId } from "mongodb";
import { movies } from "../config/mongoCollections";
import { checkID, checkNumber, checkString } from "../helpers";

export const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  if (!movieId || !reviewTitle || !reviewerName || !review || !rating)
    throw "All fields need to have valid values"
  movieId = checkID(movieId)
  reviewTitle = checkString(reviewTitle)
  reviewerName = checkString(reviewerName)
  review = checkString(review)

  const movieCollection = await movies()
  const movie = await movieCollection.findOne({_id: new ObjectId(movieId)})
  if (!movie) throw 'No movie with that id'

  rating = checkNumber(rating)
  if (rating < 1 || rating > 5)
    throw `${rating} needs to be between 1 and 5.`
  else {
    if (!Number.isInteger(rating) || !(/^\d\.\d$/.test(rating.toString()) && rating >= 1.5 && rating <= 4.8))
      throw `Rating needs to be an integer or float between 1.5 and 4.8 with only one decimal place`
  }

  //Ask if we add reviewDate here
  let newReview = {
    reviewTitle: reviewTitle,
    reviewerName: reviewerName,
    review: review,
    rating: rating,
  }
};

export const getAllReviews = async (movieId) => {
};

export const getReview = async (reviewId) => {};

export const removeReview = async (reviewId) => {};

module.exports = {};
