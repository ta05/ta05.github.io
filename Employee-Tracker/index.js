const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const Department = require("./classes/department");
const Role = require("./classes/role");

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
                "View all departments",
                "View all roles",
                "View all employees",
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
                    addRole();
                    break;
                case "Add employee":
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
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

function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the new role?",
            },
            {
                name: "id",
                type: "input",
                message: "What is the role's id?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the role's starting salary?",
            },
            {
                name: "deptId",
                type: "input",
                message: "What is the role's department id?",
            }
        ])
        .then(function ({ title, id, salary, deptId }) {
            const newRole = new Role(parseInt(id), title, parseFloat(salary), parseInt(deptId));
            const query = newRole.addQuery();
            connection.query(query, function (err, res) {
                if (err)
                    throw err;
                console.log("New role added\n");
                init();
            });
        });
}

function viewAllDepartments() {
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

function viewAllRoles() {
    const query = Role.prototype.viewQuery();
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        res.forEach(role => {
            console.log(
                "id: " +
                role.id +
                " || title: " +
                role.title + 
                " || salary: $" +
                role.salary + 
                " || dept id: " +
                role.department_id
            );
        });
        init();
    });
}