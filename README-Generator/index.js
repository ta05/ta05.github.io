const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

console.log("Welcome to the README generator. This command line application will dynamically generate a high quality README through the user's input.")

inquirer
    .prompt([
        {
            type: "input",
            message: "What is the title of your application?",
            name: "title"
        },
        {
            type: "input",
            message: "Please write a short description of your application.",
            name: "description"
        },
    ])
    .then(function ({ title, description }) {

const skeleton = `#  ${title}

## Description

${description}

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Credits](#credits)
-   [License](#license)
-   [Contributing](#contributing)
-   [Tests](#tests)
-   [Questions](#questions)`;

        fs.writeFile("./README.md", skeleton, function(err) {
            if (err) {
                throw err;
            }
        
            console.log("Successfully wrote to README.md file");
            });
    });