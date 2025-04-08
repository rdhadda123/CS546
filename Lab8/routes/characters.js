//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import express from 'express'
import { checkID, checkString } from '../helpers.js';
import { getCharacterById, searchCharactersByName } from '../data/characters.js';
const router = express.Router()
router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    return res.render('home', { title: 'Marvel Universe Character Search' })
  } catch (e) {
    return res.status(500).json({error: e})
  }
});

router.route('/searchmarveluniverse').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
  const name = checkString(req.body.searchByCharactersName)
  
  try {
    const data = await searchCharactersByName(name)
    if (data.length === 0 || !data)
      return res.render('error', {
        error: 404,
        message: `We're sorry, but no results were found for ${name}`
      })
    return res.render('characterSearchResults', {
      title: 'Characters Found',
      searchTerm: name,
      characters: data,
    })
  } catch (e) {
    return res.status(500).json({error: e})
  }
});

router.route('/character/:id').get(async (req, res) => {
  //code here for GET a single character
  const id = checkID(req.params.id)
  try {
    const data = await getCharacterById(id)
    if (data.length === 0 || !data)
      return res.render('error', {
        error: 404,
        message: `We're sorry, but no results were found for id of ${id}`
      })

    const character = data[0]
    return res.render('characterById', {
      title: character.name,
      characterName: character.name,
      imageUrl: character.thumbnail.path + '/portrait_uncanny.jpg',
      description: character.description,
      comics: character.comics.items
    })
  } catch (e) {
    return res.status(500).json({error: e})
  }
});

export default router
