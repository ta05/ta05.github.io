const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const Department = require("./department");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "FireEmblemHeroes",
    database: "business_db"
});


connection.connect((err) => {
    if (err)
        throw err;
    console.log("Welcome to the Employee Tracker Command Line Interface.\n");
    init();
});

function init() {
    inquirer.
        prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View department",
                "View role",
                "View employee",
                "Update employee",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                case "Add employee":
                case "View department":
                    viewDepartment();
                    break;
                case "View role":
                case "View employee":
                case "Update employee":
                case "Exit":
                    connection.end();
                    break;
        }
    })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of the new department?",
            },
            {
                name: "id",
                type: "input",
                message: "What is the department's id?",
            }
        ])
        .then(function ({ name, id }) {
            const newDepartment = new Department(parseInt(id), name);
            const query = newDepartment.addQuery();
            connection.query(query, function (err, res) {
                if (err)
                    throw err;
                console.log("New department added\n");
                init();
            });
        });
}

function viewDepartment() {
    const query = Department.prototype.viewQuery();
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        res.forEach(department => {
            console.log(
                "id: " +
                department.id +
                " || name: " +
                department.name
            );
        });
        init();
    });
}