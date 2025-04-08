//import axios, md5
import axios from 'axios';
import md5 from 'blueimp-md5'
import { checkID, checkString } from '../helpers.js';
const publickey = 'b3582c6d6249ee222a7dfc50341e819d';
const privatekey = '2e944dfa46288075104a8cd93297794375974864';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const auth = `ts=${ts}&apikey=${publickey}&hash=${hash}`;

export const searchCharactersByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param
  name = checkString(name)
  const { data } = await axios.get(`${baseUrl}?nameStartsWith=${name}&${auth}`)
  if (!data || !data.data || !Array.isArray(data.data.results)) {
    throw 'Invalid response from API'
  }

  return data.data.results.slice(0,20)

};

export const getCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
  id = checkID(id)
  const { data } = await axios.get(`${baseUrl}/${id}?${auth}`)
  if (!data || !data.data || !Array.isArray(data.data.results)) {
    throw 'Invalid response from API'
  }
  return data.data.results
};
