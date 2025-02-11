/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script and the type module property*/

import { arrayStats, mergeCommonElements, numberOfOccurrences} from "./arrayUtils.js";
import { camelCase, replaceCharsAtIndexes, compressString} from "./stringUtils.js";
import { deepEquality, commonKeysValues, calculateObject } from "./objectUtils.js";

console.log(arrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11, 30, 4,1,-20])); // Returns: { mean: 7.5, median: 7, mode: 5, range: 50, minimum: -20, maximum: 30, count: 13, sum: 97.5 }
console.log(arrayStats([7, 9, 11, 15, 19, 20, 35, 0])); // Returns: { mean: 14.5, median: 13, mode: 0, range: 35, minimum: 0, maximum: 35, count: 8, sum: 116 }
console.log(arrayStats([11, 54, 79, 5, -25, 54, 19, 11, 56, 100]));
console.log(numberOfOccurrences([1, 2, 3], [4,5,6,1], [2,5,6,3]));
console.log(numberOfOccurrences([1, "foo", "bar"], ["bar", 5, 6, 1], ["foo", 5, 6, 3]));
// console.log(numberOfOccurrences(["foo", 10], ["bar", "hello"], ["foo", "world"], ["baz", 30], ["foo", 5], ["bar", 15], ["baz", "20"]));



console.log(camelCase('my function rocks'))
console.log(camelCase('FOO BAR'))
console.log(camelCase("How now brown cow"))


console.log(compressString("aaabbccc"))
console.log(compressString("hello"))
console.log(compressString("hi world"))
console.log(compressString("aaAA"))
// console.log(compressString(""))
// console.log(compressString("         "))

console.log(calculateObject({ a: 3, b: 7, c: 5 }, n => n * 2))
