/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/
import * as movieData from './data/movies.js'
import { dbConnection, closeConnection } from './config/mongoConnection.js'

const db = await dbConnection();
await db.dropDatabase();

async function main() {
    let hackers = undefined
    let fortyTwo = undefined
    let breakfastClub = undefined
    let wrongOne  = undefined
    let notMovie = undefined
    let wrongNewName = undefined

    try {
        hackers = await movieData.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
        console.log(hackers);
    } catch (e) {
        console.log(e)
    }

    try {
        fortyTwo = await movieData.createMovie("42", "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.", ["Biography", "Drama", "Sport"], "PG-13", "Warner Brothers", "Brian Helgeland", ["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"], "04/09/2013", "2h 8min")
        const allMovies = await movieData.getAllMovies()
        console.log(allMovies)
    } catch (e) {
        console.log(e)
    }

    try {
        breakfastClub = await movieData.createMovie("The Breakfast Club", "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.", ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes", ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], "02/07/1985", "1h 37min");
        console.log(breakfastClub);
    } catch (e) {
        console.log(e)
    }

   

    try {
        hackers = await movieData.renameMovie(hackers._id, "Hackerz"); 
        console.log(hackers);
    } catch (e) {
        console.log(e)
    }

    try {
        fortyTwo = await movieData.removeMovie(fortyTwo._id)
        console.log(fortyTwo)
    } catch (e) {
        console.log(e)
    }
    try {
        const allMovies2 = await movieData.getAllMovies()
        console.log(allMovies2)
    } catch (e) {
        console.log(e)
    }
    
    try {
        wrongOne = await movieData.createMovie("CS546", "Movie about course", ["Horror"], "R+", "Stevens", "Professor Hill", ["Rishabh Dhadda"], "02/15/2002", "1h 20min")
        console.log(wrongOne)
    } catch (e) {
        console.log(e)
    }

    try {
        notMovie = await movieData.removeMovie("67c74cfc621c5de1010dea2b")
        console.log(notMovie)
    } catch (e) {
        console.log(e)
    }

    try {
        notMovie = await movieData.renameMovie("67c74cfc621c5de1010dea2b", "FortyTwo"); 
        console.log(notMovie);
    } catch (e) {
        console.log(e)
    }

    try {
        wrongNewName = await movieData.renameMovie(breakfastClub._id, "TBC!"); 
        console.log(wrongNewName);
    } catch (e) {
        console.log(e)
    }

    try {
        wrongNewName = await movieData.renameMovie(breakfastClub._id, "T"); 
        console.log(wrongNewName);
    } catch (e) {
        console.log(e)
    }

    try {
        wrongNewName = await movieData.renameMovie(breakfastClub._id, "The Breakfast Club"); 
        console.log(wrongNewName);
    } catch (e) {
        console.log(e)
    }

    try {
        const movie = await movieData.getMovieById(fortyTwo._id)
        console.log(movie)
    } catch (e) {
        console.log(e)
    }

    await closeConnection();
}

main();

