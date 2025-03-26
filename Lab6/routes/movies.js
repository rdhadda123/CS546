//require express and express router as shown in lecture code
import express from 'express'
import { movieData } from '../data/index.js';
import { checkCastMembers, checkDateReleased, checkDirector, checkGenres, checkID, checkRating, checkRuntime, checkString, checkStudio, checkTitle } from '../helpers.js';

const router = express.Router()
router
  .route('/')
  .get(async (req, res) => {
    try{
      let movieList = await movieData.getAllMovies()
      let formatMovies = movieList.map(({_id, title}) => ({_id, title}))
      res.json(formatMovies)
    } catch (e) {
      return res.status(500).send({error: e})
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let movieInfo = req.body;
    console.log(req.body)
    if (!movieInfo || Object.keys(movieInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'})
    }

    try {
      movieInfo.title = checkTitle(movieInfo.title)
      movieInfo.plot = checkString(movieInfo.plot)
      movieInfo.genres = checkGenres(movieInfo.genres)
      movieInfo.rating = checkRating(movieInfo.rating)
      movieInfo.studio = checkStudio(movieInfo.studio)
      movieInfo.director = checkDirector(movieInfo.director)
      movieInfo.castMembers = checkCastMembers(movieInfo.castMembers)
      movieInfo.dateReleased = checkDateReleased(movieInfo.dateReleased)
      movieInfo.runtime = checkRuntime(movieInfo.runtime)
    } catch (e) {
      return res.status(400).json({error: e})
    }

    try {
      let {title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime} = movieInfo
      let newMovie = await movieData.createMovie(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime)
      console.log(newMovie)
      return res.json(newMovie)
    } catch (e) {
      return res.status(500).json({error: e})
    }
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.movieId = checkID(req.params.movieId)
    } catch (e) {
      return res.status(400).json({error: e}) 
    }

    try {
      let movie = await movieData.getMovieById(req.params.movieId)
      return res.json(movie)
    } catch (e) {
      return res.status(404).send(e)
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.movieId = checkID(req.params.movieId)
    } catch (e) {
      return res.status(400).json({error: e}) 
    }

    try {
      await movieData.getMovieById(req.params.movieId)
    } catch (e) {
      return res.status(404).json({error: e}) 
    }

    try {
      let deletedMovie = await movieData.removeMovie(req.params.movieId)
      return res.json(deletedMovie)
    } catch (e) {
      return res.status(404).send({error: e})
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    let movieInfo = req.body
    if (!movieInfo || Object.keys(movieInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'})
    }

    try {
      req.params.movieId = checkID(req.params.movieId)
      movieInfo.title = checkTitle(movieInfo.title)
      movieInfo.plot = checkString(movieInfo.plot)
      movieInfo.genres = checkGenres(movieInfo.genres)
      movieInfo.rating = checkRating(movieInfo.rating)
      movieInfo.studio = checkStudio(movieInfo.studio)
      movieInfo.director = checkDirector(movieInfo.director)
      movieInfo.castMembers = checkCastMembers(movieInfo.castMembers)
      movieInfo.dateReleased = checkDateReleased(movieInfo.dateReleased)
      movieInfo.runtime = checkRuntime(movieInfo.runtime)
    } catch (e) {
      return res.status(400).json({error: e})
    }

    try {
      await movieData.getMovieById(req.params.movieId)
    } catch (e) {
      return res.status(404).json({error: "Error 1"}) 
    }

    try {
      let {title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime} = movieInfo
      const updatedMovie = await movieData.updateMovie(
        req.params.movieId, title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime
      )
      return res.json(updatedMovie)
    } catch (e) {
      return res.status(404).send({error: "Error 2"});
    }
  });

  export default router;
