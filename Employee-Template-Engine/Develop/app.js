const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
        employee: "employee"
    },
    {
        type: "input",
        message: "What is the employee's id?",
        name: "id",
        employee: "employee"
    },
    {
        type: "input",
        message: "What is the employee's email?",
        name: "email",
        employee: "employee"
    },
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "officeNum",
        employee: "manager"
    },
    {
        type: "input",
        message: "How many engineers are on the team?",
        name: "numEngineer",
        employee: "manager"
    },
    {
        type: "input",
        message: "How many interns are on the team?",
        name: "numIntern",
        employee: "manager"
    },
    {
        type: "input",
        message: "What is the engineer's GitHub username?",
        name: "github",
        employee: "engineer"
    },
    {
        type: "input",
        message: "What is the intern's school?",
        name: "school",
        employee: "intern"
    }
];

let employeeList = [];

console.log("Welcome to the Employee Template Engine. You will receive a series of prompts requesting information about your employees.\n")
console.log(`Please fill out employee information for the manager.`);

inquirer
    .prompt(questions.filter(question => (question.employee === 'employee' || question.employee === 'manager')))
    .then(async function ({ name, id, email, officeNum, numEngineer, numIntern }) {
        employeeList.push(new Manager(name, id, email, officeNum));
        console.log("\n\n");
        if(parseInt(numEngineer) > 0)
            await engineerPrompt(parseInt(numEngineer));
        if(parseInt(numIntern) > 0)
            await internPrompt(parseInt(numIntern));
        
        const htmlFrame = render(employeeList);
        fs.writeFile(outputPath, htmlFrame, function (err) {
            if (err) {
                throw err;
            }
            console.log(`Successfully wrote to ${outputPath}`);
        })
    });


async function engineerPrompt(numEmployee) {
    console.log(`Please fill out employee information for the ${numEmployee} engineer(s)`);
    for (var i = 0; i < numEmployee; i++) {
        const response = await inquirer
            .prompt(questions.filter(question => (question.employee === 'employee' || question.employee === 'engineer')));
        employeeList.push(new Engineer(response.name, response.id, response.email, response.github));
        console.log("");
    }
    console.log("\n");
}

async function internPrompt(numEmployee) {
    console.log(`Please fill out employee information for the ${numEmployee} intern(s)`);
    for (var i = 0; i < numEmployee; i++) {
        const response = await inquirer
            .prompt(questions.filter(question => (question.employee === 'employee' || question.employee === 'intern')));
        employeeList.push(new Intern(response.name, response.id, response.email, response.school));
        console.log("");
    }
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
