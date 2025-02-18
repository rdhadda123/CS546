/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder. 

import people from "./people.js");

async function main(){
    try{
        const peopledata = await people.getPeople();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/

import * as people from "./people.js"
import * as companies from "./companies.js"

async function main(){
    // try{
    //     const peopledata = await people.getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440");
    //     console.log(peopledata);
    // }catch(e){
    //     console.log(e);
    // }

    // try{
    //     const peopledata2 = await people.getPersonById();
    //     console.log(peopledata2);
    // }catch(e){
    //     console.log(e);
    // }

    try{
        const jobData = await people.sameJobTitle("Help Desk Operator");
        console.log(jobData);
    }catch(e){
        console.log(e);
    }

    try{
        const jobData2 = await people.sameJobTitle();
        console.log(jobData2);
    }catch(e){
        console.log(e);
    }

    try{
        const postal = await people.getPostalCodes("Salt Lake City", "Utah");
        console.log(postal);
    }catch(e){
        console.log(e);
    }

    try{
        const postal2 = await people.getPostalCodes(13, 25);
        console.log(postal2);
    }catch(e){
        console.log(e);
    }
}

main()
