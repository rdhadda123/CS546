/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let camelCase = (str) => {
      if (!str)
            throw "String does not exist"
      if (str === "")
            throw "String length needs to be greater than 0"
      if (typeof str !== "string")
            throw "Input needs to be a string"

      let strArray = str.split(" ")
      strArray[0] = strArray[0].toLowerCase()

      for (let i = 1; i < strArray.length; i++){
            strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].substring(1, strArray[i].length).toLowerCase()
      }

      return strArray.join('')
};

let replaceCharsAtIndexes = (str, idxArr) => {
      
};

export let compressString = (str) => {
      if (!str || typeof str !== "string")
            throw "String does not exist"
      if (!str.trim())
            throw "String can't be empty"
};
