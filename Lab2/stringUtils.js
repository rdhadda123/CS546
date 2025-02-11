/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let camelCase = (str) => {
      if (!str)
            throw "String does not exist"
      if (str.length === 0)
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

export let replaceCharsAtIndexes = (str, idxArr) => {
      if (!str || typeof str !== "string")
            throw "String does not exist"
      if (str.length === 0)
            throw "String needs to have length greater than 0"
      if (!str.trim())
            throw "String can't be empty"
      if (!(Array.isArray(idxArr)) || idxArr.length === 0)
            throw "Invalid index array"
      idxArr.forEach((element) => {
            if (!Number.isInteger(element))
                  throw `${element} needs to be an integer`
            if ((element <= 0) || (element > str.length - 2))
                  throw `${element} is an invalid index`
      })

      // let result = str.split('');
      // let replacements = {};

      // idxArr.forEach(idx => {
      //       const char = str[idx];
      //       const before = str[idx - 1] || '';
      //       const after = str[idx + 1] || '';
      //       replacements[char] = (before + after).split('');
      // });

      // for (let i = 0; i < result.length; i++) {
      //       if (idxArr.includes(i)) continue;
      //       if (replacements[result[i]]) {
      //             let replacementArr = replacements[result[i]];
      //             result[i] = replacementArr.shift();
      //             replacements[result[i]] = replacementArr.length ? replacementArr : replacements[result[i]];
      //       }
      // }

      // return result.join('');
};

export let compressString = (str) => {
      if (!str || typeof str !== "string")
            throw "String does not exist"
      if (!str.trim())
            throw "String can't be empty"

      let resultStr = ""
      let count = 1

      for (let i = 0; i < str.length; i++){
            if (str[i] === str[i + 1])
                  count += 1
            else {
                  if (count > 1){
                        resultStr += str[i] + count
                  } else {
                        resultStr += str[i] + ""
                  }
                  count = 1
            }
      }

      return resultStr
};
