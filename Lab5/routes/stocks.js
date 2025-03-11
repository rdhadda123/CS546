//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getStocks() function in the /data/data.js file 3 to return the list of stocks and call it in the /stocks route.  You can also import your getStockById(id) function and call it in the :/id route.
import express from 'express'
import { getStocks, getStockById } from '../data/data.js';
import { checkId } from '../helpers.js';

const router = express.Router();

router
    .route('/')
    .get(async (req, res) => {
        try {
            const stockList = await getStocks()
            return res.json(stockList)
        } catch (e) {
            return res.status(500).send(e)
        }
    })
// Implement GET Request Method and send a JSON response See lecture code!

router
    .route('/:id')
    .get(async (req, res) => {
        try {
            req.params.id = checkId(req.params.id)
        } catch (e) {
            return res.status(400).json({error: e})
        }
        try {
            const stock = await getStockById(req.params.id)
            return res.json(stock)
        } catch (e) {
            return res.status(404).json(e)
        }
    })
//Implement GET Request Method and send a JSON response See lecture code!

export default router;
