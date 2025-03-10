/*Here, you can export the data functions
to get the stocks, people, getStockById, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/
import {getPeopleData, getStocksData, checkId} from '../helpers.js'

export const getStocks = async () => {
    const stocksCollection = await getStocksData()
    return stocksCollection.find({}).toArray()
};

export const getPeople = async () => {
    const peopleCollection = await getPeopleData()
    return peopleCollection.find({}).toArray()
};

export const getStockById = async (id) => {};

export const getPersonById = async (id) => {};
