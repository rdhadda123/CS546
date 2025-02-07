export const questionOne = (arr) => {
  // Implement question 1 here
  let result = []
  function calculateFactorial(num) { //Helper function to calculate factorial
    let answer = 1 //Start at 1 so never hits 0
    while (num > 0){ //Whole loop to traverse from num to 1
      answer *= num //Multiply each number and add to recurring total
      num -= 1 //Decrease 1 number at a time
    }
    return answer
  }

  for (let i = 0; i < arr.length; i++){ //Traverse through whole array and calculate factorial for each number
    result.push(calculateFactorial(arr[i]))
  }

  return result; //return result
};

export const questionTwo = (arr) => {
  // Implement question 2 here
  let resultObj = {}
  function checkPrime(num) { //Helper function to check if number is prime 
    if (num < 2) //Anything under 2 is not prime
      return false
    for (let i = 2; i * i <= num; i++){ //Traverse and divide num by i to check if remainder is 0. i * i used to shorten time complexity
      if (num % i == 0)
        return false
    }
    return true
  }

  if (!arr) //Edge case for if there is no array inputted
    return resultObj

  for (let j = 0; j < arr.length; j++){ //Traverses through whole array and adds each element to object along with True of False for prime
    resultObj[arr[j]] = checkPrime(arr[j])
  }
  return resultObj; //return result
};

export const questionThree = (str) => {
  // Implement question 3 here
  let resultObj2 = {uppercase: 0, lowercase: 0, numbers: 0, spaces: 0, otherCharacters: 0} 
  str.split('').forEach((char) => { //Splits string and traverses through each character in string
    if (char == ' ') //Space check
      resultObj2.spaces += 1
    else if (char.toLowerCase() !== char.toUpperCase()){ //Makes sure we are dealing with a letter and not any other character
      if (char == char.toUpperCase()){ //Uppercase check
        resultObj2.uppercase += 1
      } else { //Lowercase check
        resultObj2.lowercase += 1
      }
    }
    else if (char >= '0' && char <= '9') //Checks if dealing with number
      resultObj2.numbers += 1
    else { //Everything else is 'otherCharacter'
      resultObj2.otherCharacters += 1
    }
  });
  return resultObj2; //return result
};

export const questionFour = (arr) => {
  // Implement question 4 here
  let numbers = [] //New array for numbers in arr
  let strings = [] //New array for strings in arr

  for(let i = 0; i < arr.length; i++){ //Traverses through whole arr
    if (typeof arr[i] == "number") //If element is a number then add to numbers array
      numbers.push(arr[i])
    else if (typeof arr[i] == "string") //If element is a string then add to numbers array
      strings.push(arr[i])
  }

  //Sorts both numbers and strings array and then concatenates
  return numbers.sort().concat(strings.sort()); //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Rishabh',
  lastName: 'Dhadda',
  studentId: '10460208'
};