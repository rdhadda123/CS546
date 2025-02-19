//Export the following functions using ES6 Syntax
import axios from "axios";

export async function getPeople() {
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json')
    return data
}

export const getPersonById = async (id) => {
    if (!id)
        throw "id does not exist"
    if (typeof id !== "string")
        throw "id needs to be a string"
    id = id.trim()

    if (id.length === 0)
        throw "id can't be empty spaces"

    try {
        let data = await getPeople()
        for (const person of data){
            if (person.id === id)
                return person
        }
        
        throw "Person not found"
    } catch (e) {
        throw e
    }
};

export const sameJobTitle = async (jobTitle) => {
    if (!jobTitle)
        throw "jobTitle does not exist"
    if (typeof jobTitle !== "string")
        throw "jobTitle needs to be a string"

    jobTitle = jobTitle.trim()

    if (jobTitle.length === 0)
        throw "jobTitle can't be empty spaces"

    try {
        let result = []
        let data = await getPeople()

        for (const person of data){
            if ((person.job_title.toUpperCase() === jobTitle.toUpperCase())){
                result.push(person)
            }
        }

        if (result.length < 2)
            throw "There needs to be atleast two people with the same job title"
        else
            return result
    } catch (e) {
        throw e
    }
};

export const getPostalCodes = async (city, state) => {
    if (!city || !state)
        throw "City or state does not exist"
    if (typeof city !== "string" || typeof state !== "string")
        throw "City or state needs to be a string"

    city = city.trim()
    state = state.trim()

    if (city.length === 0 || state.length === 0)
        throw "City or state can't be empty spaces"

    try {
        let result = []
        let data = await getPeople()

        for (const person of data){
            if ((person.city.toUpperCase() === city.toUpperCase()) && (person.state.toUpperCase() === state.toUpperCase())){
                result.push(person.postal_code)
            }
        }

        if (result.length > 0)
            return result.sort((a, b) => a - b)
        else
            throw "There are no postal_codes for the given city and state combination"
    } catch (e) {
        throw e
    }
};

export const sameCityAndState = async (city, state) => {
    if (!city || !state)
        throw "City or state does not exist"
    if (typeof city !== "string" || typeof state !== "string")
        throw "City or state needs to be a string"

    city = city.trim()
    state = state.trim()

    if (city.length === 0 || state.length === 0)
        throw "City or state can't be empty spaces"

    try {
        let result = []
        let data = await getPeople()

        for (const person of data){
            let name = person.first_name + " " + person.last_name
            if ((person.city.toUpperCase() === city.toUpperCase()) && (person.state.toUpperCase() === state.toUpperCase())){
                result.push(name)
            }
        }

        if (result.length < 2)
            throw "There are not two people who live in the same city and state"
        
        return result.sort((a, b) => a.split(" ")[1].localeCompare(b.split(" ")[1]))

    } catch (e) {
        throw e
    }
};
