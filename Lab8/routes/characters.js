//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import express from 'express'
import { checkString } from '../helpers';
import { searchCharactersByName } from '../data/characters';
const router = express.Router()
router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    res.render('home')
  } catch (e) {
    return res.status(500).json({error: e})
  }
});

router.route('/searchmarveluniverse').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
  const name = checkString(req.body.searchCharacterByName)
  
  try {
    const data = await searchCharactersByName(name)
    if (data.length === 0)
      res.render('Error', {error: 404, message: `No results were found for ${name}`})
  } catch (e) {
    return res.status(500).json({error: e})
  }
});

router.route('/character/:id').get(async (req, res) => {
  //code here for GET a single character
});

//export router
