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
    try {
        const hackers = await movieData.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
        console.log(hackers);
    } catch (e) {
        console.log(e)
    }
    
    // try {
    //     const hackerByID = await movieData.getMovieById("67c727ff300bd2b6c9af002c");
    //     console.log(hackerByID)
    // } catch (e) {
    //     console.log(e)
    // }

    try {
        const fortyTwo = await movieData.createMovie("42", "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.", ["Biography", "Drama", "Sport"], "PG-13", "Warner Brothers", "Brian Helgeland", ["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"], "04/09/2013", "2h 8min")
        const allMovies = await movieData.getAllMovies()
        console.log(allMovies)
    } catch (e) {
        console.log(e)
    }

    // const allMovies = await movieData.getAllMovies()
    
    // try {
    //     console.log(allMovies)
    // } catch (e) {
    //     console.log(e)
    // }

    // try {
    //     const removeFortyTwo = await movieData.removeMovie("67c72eb4d76020940f796ebc")
    //     console.log(removeFortyTwo)
    // } catch (e) {
    //     console.log(e)
    // }

    // try {
    //     const renamedFortyTwo = await movieData.renameMovie("67c73cf3a86a46acb7e9841d", "Forty Two"); 
    //     console.log(renamedFortyTwo);
    // } catch (e) {
    //     console.log(e)
    // }

    // try {
    //     const allMovies2 = await movieData.getAllMovies()
    //     console.log(allMovies2)
    // } catch (e) {
    //     console.log(e)
    // }
    

    await closeConnection();
}

main();

