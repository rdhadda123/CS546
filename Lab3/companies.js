//Export the following functions using ES6 Syntax
import axios from "axios";

async function getCompanies() {
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json')
    return data
}

export const listEmployees = async (companyName) => {};

export const sameIndustry = async (industry) => {
    if (!industry)
        throw "industry does not exist"
    if (typeof industry !== "string")
        throw "industry needs to be a string"

    industry = industry.trim()

    if (industry.length === 0)
        throw "industry can't be empty spaces"

    try {
        let result = []
        let data = await getCompanies()

        for (const person of data){
            if ((person.industry.toUpperCase() === industry.toUpperCase())){
                result.push(person)
            }
        }

        if (result.length > 0)
            return result
        else
            throw "No companies in that industry"
    } catch (e) {
        throw e
    }
};

export const getCompanyById = async (id) => {};
