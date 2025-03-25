//Export the following functions using ES6 Syntax

import { ObjectId } from "mongodb";
import { movies } from "../config/mongoCollections";
import { checkID, checkNumber, checkReviewRating, checkString } from "../helpers";

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

  rating = checkReviewRating(rating)

  //Get current date in desired format
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2,'0')
  const year = today.getFullYear()
  
  let newReview = {
    _id: new ObjectId(),
    reviewTitle: reviewTitle,
    reviewDate: `${month}/${day}/${year}`,
    reviewerName: reviewerName,
    review: review,
    rating: rating,
  }

  //Compute overallRating
  let numReviews = movie.reviews.length
  let totalRating = movie.overallRating * numReviews
  let newRating = (rating + totalRating) / (numReviews + 1)

  //Pushing new review to reviews array in movie
  let movieReview = movie.reviews.push(newReview)

  //update movie with new review and overall rating
  let updatedMovie = {
    reviews: movieReview,
    overallRating: newRating
  }

  const updatedInfo = await movieCollection.findOneAndUpdate(
    {_id: new ObjectId(movieId)},
    {$set: updatedMovie},
    {returnDocument: 'after'}
  )

  if (!updatedInfo)
    throw 'Could not update review successfully'

  return updatedInfo
};

export const getAllReviews = async (movieId) => {
  movieId = checkID(movieId)
  const movieCollection = await movies()
  const movie = await movieCollection.findOne({_id: new ObjectId(movieId)})
  if (!movie) throw 'No movie with that id'

  return movie.reviews
};

export const getReview = async (reviewId) => {
  reviewId = checkID(reviewId)
  const movieCollection = await movies()
  const movie = await movieCollection.find({"reviews._id": new ObjectId(reviewId)})
  if (!movie) throw "No review what that id"

  const review = movie.reviews.find(review => review._id.toString() === reviewId)
  if (!review) throw "Review not found"

  return review
};

export const removeReview = async (reviewId) => {};

// module.exports = {};
