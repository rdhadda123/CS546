import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import movie from "../data/movies.js"
import reviews from "../data/reviews.js"

const db = await dbConnection()
await db.dropDatabase()

const hackers = await movie.createMovie(
    "Hackers", 
    "Hackers are blamed for making a virus that will capsize five oil tankers.", 
    ["Crime", "Drama", "Romance"], 
    "PG-13", 
    "United Artists", 
    "Iain Softley", 
    ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], 
    "09/15/1995", 
    "1h 45min"
)
const fortyTwo = await movie.createMovie(
    "42",
    "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.",
    ["Biography", "Drama", "Sport"],
    "PG-13", 
    "Warner Brothers", 
    "Brian Helgeland",
    ["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"],
    "04/09/2013", 
    "2h 8min"
)
const breakfastClub = await movie.createMovie(
    "The Breakfast Club", 
    "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.", 
    ["Comedy", "Drama"], 
    "R", 
    "Universal Pictures", 
    "John Hughes", 
    ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], 
    "02/07/1985", 
    "1h 37min")
const inception = await movie.createMovie(
    "Inception",
    "A thief who enters the dreams of others to steal secrets is given the inverse task of planting an idea into the mind of a CEO.",
    ["Action", "Adventure", "SciFi"],
    "PG-13",
    "Warner Bros",
    "Christopher Nolan",
    ["Leonardo DiCaprio", "Joseph GordonLevitt", "Ellen Page", "Tom Hardy"],
    "07/16/2010",
    "2h 28min"
  )
  
  const theMatrix = await movie.createMovie(
    "The Matrix",
    "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    ["Action", "SciFi"],
    "R",
    "Warner Bros",
    "Lana Wachowski",
    ["Keanu Reeves", "Laurence Fishburne", "CarrieAnne Moss", "Hugo Weaving"],
    "03/31/1999",
    "2h 16min"
  )
  
  const pulpFiction = await movie.createMovie(
    "Pulp Fiction",
    "The lives of two hitmen, a boxer, a gangster, and his wife intertwine in a series of violence and redemption.",
    ["Crime", "Drama"],
    "R",
    "Miramax",
    "Quentin Tarantino",
    ["John Travolta", "Samuel Jackson", "Uma Thurman", "Bruce Willis"],
    "10/14/1994",
    "2h 34min"
  )

  const hackerReview = await reviews.createReview(
    hackers._id,
    "Ok movie",
    "Rishabh Dhadda",
    "The movie was pretty good, but a little slow",
    3.5
  )

  const hackerReview2 = await reviews.createReview(
    hackers._id,
    "Amazing movie",
    "Jon Snow",
    "The movie was flat out amazing",
    5
  )

  console.log(hackers)
  console.log(hackerReview)
  console.log(hackerReview2)
  console.log(hackers)

  console.log('Done seeding database')
  await closeConnection()
   