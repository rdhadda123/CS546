/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script and the type module property*/

import { arrayStats, mergeCommonElements, numberOfOccurrences} from "./arrayUtils.js";
import { camelCase, replaceCharsAtIndexes, compressString} from "./stringUtils.js";
import { deepEquality, commonKeysValues, calculateObject } from "./objectUtils.js";

try { //Should pass
    const result = arrayStats([11, 54, 79, 5, -25, 54, 19, 11, 56, 100])
    console.log('ArrayStats passed successfully')
} catch (e) {
    console.log('ArrayStats failed test case')
}

try { //Should fail
    const result = arrayStats(["guitar", 1, 3, "apple"])
    console.log('ArrayStats did not error')
} catch (e) {
    console.log("ArrayStats failed successfully")
}

try { //Should pass
    const result = mergeCommonElements([35, "hello", 24,  ["abc", 7], 3, -4], [3, ["62", 4], 1, 24, -4, "abc"])
    console.log('MergeCommonElements passed successfully')
} catch (e) {
    console.log('MergeCommonElements failed test case')
}

try { //Should fail
    const result = mergeCommonElements([1, 2, 3], "string", [4, 5, 6])
    console.log('MergeCommonElements did not error')
} catch (e) {
    console.log("MergeCommonElements failed successfully")
}

try { //Should pass
    const result = numberOfOccurrences([1, "foo", "bar"], ["bar", 5, 6, 1], ["foo", 5, 6, 3])
    console.log('NumberOfOccurrences passed successfully')
} catch (e) {
    console.log('NumberOfOccurrences failed test case')
}

try { //Should fail
    const result = numberOfOccurrences(["key", "value"], [], ["key", "value"])
    console.log('NumberOfOccurrences did not error')
} catch (e) {
    console.log("NumberOfOccurrences failed successfully")
}


try { //Should pass
    const result = camelCase("How now brown cow")
    console.log('CamelCase passed successfully')
} catch (e) {
    console.log('CamelCase failed test case')
}

try { //Should fail
    const result = camelCase(["Hello", "World"])
    console.log('CamelCase did not error')
} catch (e) {
    console.log("CamelCase failed successfully")
}

try { //Should pass
    const result = replaceCharsAtIndexes("mississippi", [1, 4, 7])
    console.log('ReplaceCharsAtIndexes passed successfully')
} catch (e) {
    console.log('ReplaceCharsAtIndexes failed test case')
}

try { //Should fail
    const result = replaceCharsAtIndexes(12345, [2])
    console.log('ReplaceCharsAtIndexes did not error')
} catch (e) {
    console.log("ReplaceCharsAtIndexes failed successfully")
}

try { //Should pass
    const result = compressString("aaabbccc")
    console.log('compressString passed successfully')
} catch (e) {
    console.log('compressString failed test case')
}

try { //Should fail
    const result = compressString("    ")
    console.log('compressString did not error')
} catch (e) {
    console.log("compressString failed successfully")
}

try { //Should pass
    const result = deepEquality({a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}, {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}})
    console.log('deepEquality passed successfully')
} catch (e) {
    console.log('deepEquality failed test case')
}

try { //Should fail
    const result = deepEquality([1,2,3], [1,2,3])
    console.log('deepEquality did not error')
} catch (e) {
    console.log("deepEquality failed successfully")
}

try { //Should pass
    const result = commonKeysValues({name: {first: "Patrick", last: "Hill"}, age: 46}, {school: "Stevens", name: {first: "Patrick", last: "Hill"}})
    console.log('commonKeysValues passed successfully')
} catch (e) {
    console.log('commonKeysValues failed test case')
}

try { //Should fail
    const result = commonKeysValues("foo", "bar")
    console.log('commonKeysValues did not error')
} catch (e) {
    console.log("commonKeysValues failed successfully")
}

try { //Should pass
    const result = calculateObject({ a: 3, b: 7, c: 5 }, n => n * 2)
    console.log('calculateObject passed successfully')
} catch (e) {
    console.log('calculateObject failed test case')
}

try { //Should fail
    const result = calculateObject({ a: "3", b: 7, c: [1,2] }, n => n * 2)
    console.log('calculateObject did not error')
} catch (e) {
    console.log("calculateObject failed successfully")
}