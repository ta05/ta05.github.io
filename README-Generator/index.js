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
        {
            type: "input",
            message: "Please enter installation instructions for your application.",
            name: "installation"
        },
        {
            type: "input",
            message: "Please enter your application's usage instructions.",
            name: "usage"
        },
        {
            type: "input",
            message: "Please enter contribution guidlines.",
            name: "contributing"
        },
        {
            type: "input",
            message: "Please enter test instructions for your application.",
            name: "tests"
        },
    ])
    .then(function ({ title, description, installation, usage, contributing, tests }) {

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
-   [Questions](#questions)

## Installation

${installation}

## Usage

${usage}

## Contributing

${contributing}

## Tests

${tests}

`;

        fs.writeFile("./README.md", skeleton, function(err) {
            if (err) {
                throw err;
            }
        
            console.log("Successfully wrote to README.md file");
            });
    });