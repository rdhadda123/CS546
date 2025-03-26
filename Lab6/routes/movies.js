//require express and express router as shown in lecture code
import express from 'express'
import { movieData } from '../data/index.js';
import { checkCastMembers, checkDateReleased, checkDirector, checkGenres, checkID, checkRating, checkRuntime, checkString, checkStudio, checkTitle } from '../helpers';

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
    let movieInfo = req.body;
    if (!movieInfo || Object.keys(movieInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'})
    }

    try {
      movieInfo._id = checkID(movieInfo._id)
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
      let newMovie = await movieData.createMovie(
        movieInfo.title,
        movieInfo.plot,
        movieInfo.genres,
        movieInfo.rating,
        movieInfo.studio,
        movieInfo.director,
        movieInfo.castMembers,
        movieInfo.dateReleased,
        movieInfo.runtime
      )
      return res.json(newMovie)
    } catch (e) {
      return res.sendStatus(500)
    }
  });

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
      const movie = await movieData.getMovieById(req.params.movieId)
      return res.json(movie)
    } catch (e) {
      return res.status(404).json(e)
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
  })
  .put(async (req, res) => {
    //code here for PUT
  });
