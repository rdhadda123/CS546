/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let arrayStats = (array) => {
  if (!array) throw "Array does not exist"
  if (!Array.isArray(array)) throw "Input is not an array"
  if (array.length === 0) throw "Array has no elements"
  array.forEach((value) => {
    if (isNaN(value) || typeof value != "number")
      throw `${value} is not a number`
  })

  const sortedArray = array.sort((a, b) => a - b)
  let result = {mean: 0, median: 0, mode: 0, range: 0, minimum: 0, maximum: 0, count: 0, sum: 0}
  let totalSum = 0.0
  array.forEach((value) => {
    totalSum += value
  })

  function getMedian(array) {
    let mid = Math.floor(array.length / 2)
    return array.length % 2 === 0 ? (array[mid - 1] + array[mid]) / 2 : array[mid]
  }

  function getMode(array) {
    let mode = [], maxCounter = 1, counter = 1

    for (let i = 1; i < array.length; i += 1){
      if (array[i] === array[i - 1])
        counter++
      else
        counter = 1

      if (counter > maxCounter){
        maxCounter = counter
        mode = [array[i]]
      } else if (counter === maxCounter) {
        if (!mode.includes(array[i]))
          mode.push(array[i])
      }
    }

    if (maxCounter === 1)
      return 0
    else if (mode.length === 1)
      return mode[0]
    else
      return mode
  }

  result.mean = totalSum / sortedArray.length
  result.median = getMedian(sortedArray)
  result.mode = getMode(sortedArray)
  result.range = sortedArray[sortedArray.length - 1] - sortedArray[0]
  result.minimum = sortedArray[0]
  result.maximum = sortedArray[sortedArray.length - 1]
  result.count = sortedArray.length
  result.sum = totalSum

  return result
};

export let mergeCommonElements = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  if (arrays.length < 2) throw "Atleast two arrays need to be inputted"
  arrays.forEach((array) => {
    if (!Array.isArray(array))
      throw `${array} is not an array`
    if (array.length === 0)
      throw `${array} needs to have atleast one element`
    array.forEach((value) => {
      if (!((typeof value === "number") || (typeof value === "string") || Array.isArray(value)))
        throw `Each ${array} element needs to be a number, string, or array`
      if (Array.isArray(value)){
        const flattened = value.flat(Infinity)
        flattened.forEach((item) => {
          if (!((typeof item === "number") || (typeof item === "string")))
            throw `Each ${flattened} element needs to be a number or string`
        })
      }
    })
  })

};

export let numberOfOccurrences = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  if (!arrays)
    throw "Input needs to be arrays"
  arrays.forEach((array) => {
    if (!Array.isArray(array))
      throw `${array} is not an array`
    array.forEach((value) => {
      if (array.length === 0)
        throw `${array} needs to have at least one element`
      if (!((typeof value === "number") || (typeof value === "string")))
        throw `Each ${array} element needs to be a number or string`
      if (typeof value == "string"){
        value.split('').forEach((char) => {
          if (char.toLowerCase() === char.toUpperCase())
            throw `${char} is not a letter`
        })
      }
    })
  })

  const flattened = arrays.flat(Infinity)
  let resultObj = {}

  for (let i = 0; i < flattened.length; i++){
    resultObj[flattened[i]] = 0
  }

  flattened.forEach((element) => {
    resultObj[element] += 1
  })

  return resultObj
};

