import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

console.log("Question 1 Test Cases:");
console.log(lab1.questionOne([4, 2, 7])); // returns and then outputs: [24, 2, 5040]
console.log(lab1.questionOne([3,8,9])); // returns and then outputs: [6, 40320, 362880] 
console.log(lab1.questionOne([4])); // returns and then outputs: [24]
console.log(lab1.questionOne([0, 1, 2, 3, 4, 5])); //returns and then outputs: [1, 1, 2, 6, 24, 120]
console.log(lab1.questionOne([9, 8, 7, 6, 5, 4, 3, 2, 1])) //returns and then outputs: [362880, 40320, 5040, 720, 120, 24, 6, 2, 1]

console.log("Question 2 Test Cases:");
console.log(lab1.questionTwo([5, 3, 10])); // returns and then outputs: {5:true, 3: true, 10: false}
console.log(lab1.questionTwo([5, 10, 9])); // returns and then outputs: {5: true, 10: false, 9: false}
console.log(lab1.questionTwo([2, 7, 9, 1013])); // returns and then outputs: {2: true, 7: true, 9: false, 1013: true}
console.log(lab1.questionTwo([])); // returns and then outputs: {}
console.log(lab1.questionTwo()); // returns and then outputs: {}

console.log("Question 3 Test Cases:");
console.log(lab1.questionThree("HellO  WorlD   1234!?!")); // returns and then outputs: {uppercase: 4, lowercase: 6, numbers: 4, spaces: 5, otherCharacters: 3}
console.log(lab1.questionThree("1234 ABcd ef!")); // returns and then outputs {uppercase: 2, lowercase: 4, numbers: 4, spaces: 2, otherCharacters: 1}
console.log(lab1.questionThree("")); // returns and then outputs {uppercase: 0, lowercase: 0, numbers: 0, spaces: 0, otherCharacters: 0}
console.log(lab1.questionThree("     ")); // returns and then outputs {uppercase: 0, lowercase: 0, numbers: 0, spaces: 5, otherCharacters: 0}
console.log(lab1.questionThree(" I LIKE web dev")) //returns and then outputs {uppercase: 5, lowercase: 6, numbers: 0, spaces: 4, otherCharacters: 0}

console.log("Question 4 Test Cases:");
console.log(lab1.questionFour([3, "guitar", 1, "bass", -10])) //, would return and then output [-10, 1, 3, "bass", "guitar"]
console.log(lab1.questionFour([0, "Patrick", 100, "Hill", -50])) //, would return and then output [-50, 0, 100, "Hill", "Patrick"]
console.log(lab1.questionFour([123, "Web Programming", 500, "Programming"])) //, would return and then output [123, 500, "Programming", "Web Programming"]
console.log(lab1.questionFour([123, "01b Programming", 500, "0Programming"])) //, would return and then output [123, 500, "01b Programming", "0Programming"]
console.log(lab1.questionFour([-10, "-10", 1, 3, "-3", "WebDev"])) //, would return and then output [-10, 1, 3, "-10", "-3", "WebDev"]