/*Here, you can export the data functions
to get the stocks, people, getStockById, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/
import {getPeopleData, getStocksData, checkId} from '../helpers.js'

export const getStocks = async () => {
    const stocksCollection = await getStocksData()
    return stocksCollection
};

export const getPeople = async () => {
    const peopleCollection = await getPeopleData()
    return peopleCollection
};

export const getStockById = async (id) => {
    id = checkId(id)
    const stocksCollection = await getStocksData()
    for (const stock of stocksCollection) {
        if (stock.id === id)
            return stock
    }

    throw `Stock with id: ${id} not found`
    
};

export const getPersonById = async (id) => {
    id = checkId(id)
    const peopleCollection = await getPeopleData()
    for (const person of peopleCollection) {
        if (person.id === id)
            return person
    }
    throw `Person with id: ${id} not found`
};
