const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const Department = require("./classes/department");
const Role = require("./classes/role");
const Employee = require("./classes/employee");

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
                    addEmployee();
                    break;
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Update employee":
                    updateEmployeeRole();
                    break;
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
            connection.query(query, newDepartment.getValues(), function (err, res) {
                if (err)
                    throw err;
                console.log("\nNew department added\n");
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
            connection.query(query, newRole.getValues(), function (err, res) {
                if (err)
                    throw err;
                console.log("\nNew role added\n");
                init();
            });
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first",
                type: "input",
                message: "What is the new employee's first name?",
            },
            {
                name: "last",
                type: "input",
                message: "What is the new employee's last name?",
            },
            {
                name: "id",
                type: "input",
                message: "What is the employee's id?",
            },
            {
                name: "roleId",
                type: "input",
                message: "What is the employee's role id?",
            },
            {
                name: "managerId",
                type: "input",
                message: "What is the id of the employee's manager?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function ({ first, last, id, roleId, managerId }) {
            const newEmployee = new Employee(parseInt(id), first, last, parseInt(roleId), managerId === "" ? null : parseInt(managerId));
            const query = newEmployee.addQuery();
            connection.query(query, newEmployee.getValues(), function (err, res) {
                if (err)
                    throw err;
                console.log("\nNew Employee added\n");
                init();
            });
        });
}

function viewAllDepartments() {
    const query = Department.prototype.viewQuery;
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
    const query = Role.prototype.viewQuery;
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

function viewAllEmployees() {
    const query = Employee.prototype.viewQuery;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        res.forEach(employee => {
            console.log(
                "id: " +
                employee.id +
                " || first name: " +
                employee.first_name + 
                " || first name: " +
                employee.last_name + 
                " || role id: " +
                employee.role_id + 
                " || manager id: " +
                employee.manager_id
            );
        });
        init();
    });
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the employee's id?"
            },
            {
                name: "newRoleId",
                type: "input",
                message: "What is the id of the employee's new role?"
            }
        ])
        .then(function ({ id, newRoleId }) {
            const query = Employee.prototype.updateRoleQuery;
            connection.query(query, [{ role_id: parseInt(newRoleId) }, { id: parseInt(id) }], function (err, res) {
                if (err)
                    throw err;
                console.log("Updated employee's role\n");
                init();
            });
        })
}