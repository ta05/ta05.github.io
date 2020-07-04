const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());

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
                "View employees by manager",
                "View employees by department",
                "Update employee's role",
                "Update employee's manager",
                "Delete department",
                "Delete role",
                "Delete employee",
                "View department salary budget",
                "Exit"
            ]
        })
        .then(function (answer) {
            console.log("\n");
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
                case "View employees by manager":
                    viewEmployeesByManager();
                    break;
                case "View employees by department":
                    viewEmployeesByDepartment();
                    break;
                case "Update employee's role":
                    updateEmployeeRole();
                    break;
                case "Update employee's manager":
                    updateEmployeeManager();
                    break;
                case "Delete department":
                    deleteDepartment();
                    break;
                case "Delete role":
                    deleteRole();
                    break;
                case "Delete employee":
                    deleteEmployee();
                    break;
                case "View department salary budget":
                    viewDepartmentSalary();
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
    const query = Department.prototype.viewQuery;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        
        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "What is the title of the new role?"
                },
                {
                    name: "id",
                    type: "input",
                    message: "What is the role's id?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the role's starting salary?"
                },
                {
                    name: "department",
                    type: "list",
                    message: "Select the department.",
                    choices: function () {
                        let choiceArray = [];
                        res.forEach(dept => {
                            choiceArray.push(dept.name);
                        });
                        return choiceArray;
                    }
                }
            ])
            .then(function ({ title, id, salary, department }) {
                const query = Role.prototype.addQuery;
                connection.query(query, [parseInt(id), title, parseFloat(salary), {name: department}], function (err, res) {
                    if (err)
                        throw err;
                    console.log("\nNew role added\n");
                    init();
                });
            });
    });
}

function addEmployee() {
    const query = `SELECT DISTINCT m.id as emp_id, r.id as role_id, r.title, CONCAT(m.first_name, " ", m.last_name) AS name FROM role r LEFT JOIN employee m ON(m.role_id = r.id)`;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        
        inquirer
            .prompt([
                {
                    name: "first",
                    type: "input",
                    message: "What is the new employee's first name?"
                },
                {
                    name: "last",
                    type: "input",
                    message: "What is the new employee's last name?"
                },
                {
                    name: "id",
                    type: "input",
                    message: "What is the employee's id?"
                },
                {
                    name: "title",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: function () {
                        let choiceArray = [];
                        res.forEach(emp => {
                            if(!(choiceArray.indexOf(emp.title) + 1))
                                choiceArray.push(emp.title);
                        });
                        return choiceArray;
                    }
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: function () {
                        let choiceArray = ["None"];
                        for (var i = 0; i < res.length; i++){
                            if(res[i].name !== null)
                                choiceArray.push(res[i].name);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(function ({ first, last, id, title, manager }) {
                let newManagerId = null;
                let newRoleId;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].name === manager) {
                        newManagerId = res[i].emp_id;
                    }
                    if (res[i].title === title) {
                        newRoleId = res[i].role_id;
                    }
                }
                const query = Employee.prototype.addQuery;
                connection.query(query, [id, first, last, newRoleId, newManagerId], function (err, res) {
                    if (err)
                        throw err;
                    console.log("\nNew Employee added\n");
                    init();
                });
            });
    });
}

function viewAllDepartments() {
    const query = Department.prototype.viewQuery;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        console.table(res);
        init();
    });
}

function viewAllRoles() {
    const query = Role.prototype.viewQuery;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        console.table(res);
        init();
    });
}

function viewAllEmployees() {
    const query = Employee.prototype.viewQuery;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        console.table(res);
        init();
    });
}

function viewEmployeesByManager() {
    const query = `SELECT CONCAT(first_name, " ", last_name) name FROM employee m`;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        
        inquirer
            .prompt([
                {
                    name: "manager",
                    type: "list",
                    message: "Select the manager.",
                    choices: function () {
                        let choiceArray = ["None"];
                        for (var i = 0; i < res.length; i++){
                            if(res[i].name !== null)
                                choiceArray.push(res[i].name);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(function ({ manager }) {
                console.log();
                manager = manager === "None" ? null : manager;
                const query = `${Employee.prototype.viewQuery} WHERE CONCAT(m.first_name, " ", m.last_name) = ? `;
                connection.query(query, manager, function (err, res) {
                    if (err)
                        throw err;
                    console.table(res);
                    init();
                });
            });
    });
}

function viewEmployeesByDepartment() {
    const query = Department.prototype.viewQuery;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        
        inquirer
            .prompt([
                {
                    name: "department",
                    type: "list",
                    message: "Select the department.",
                    choices: function () {
                        let choiceArray = [];
                        res.forEach(dept => {
                            choiceArray.push(dept.name);
                        });
                        return choiceArray;
                    }
                }
            ])
            .then(function ({ department }) {
                console.log();
                const query = `${Employee.prototype.viewQuery} WHERE d.name = ? `;
                connection.query(query, department, function (err, res) {
                    if (err)
                        throw err;
                    console.table(res);
                    init();
                });
            });
    });
}

function updateEmployeeRole() {
    const query = `SELECT DISTINCT r.id, r.title, CONCAT(e.first_name, " ", e.last_name) AS name FROM role r LEFT JOIN employee e ON(e.role_id = r.id)`;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        
        inquirer
            .prompt([
                {
                    name: "name",
                    type: "list",
                    message: "Select the employee",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].name !== null)
                                choiceArray.push(res[i].name);
                        }
                        return choiceArray;
                    }
                },
                {
                    name: "title",
                    type: "list",
                    message: "What is the employee's new role?",
                    choices: function () {
                        let choiceArray = [];
                        res.forEach(emp => {
                            if (!(choiceArray.indexOf(emp.title) + 1))
                                choiceArray.push(emp.title);
                        });
                        return choiceArray;
                    }
                }
            ])
            .then(function ({ name, title }) {
                let newRoleId;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].title === title) {
                        newRoleId = res[i].id;
                        break;
                    }
                }
                const query = Employee.prototype.updateQuery;
                connection.query(query, [{ role_id: parseInt(newRoleId) }, name], function (err, res) {
                    if (err)
                        throw err;
                    console.log("\nUpdated employee's role\n");
                    init();
                });
            });
    });
}

function updateEmployeeManager() {
    const query = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS name FROM employee e`;
    connection.query(query, function (err, res) {
        inquirer
            .prompt([
                {
                    name: "name",
                    type: "list",
                    message: "Select the employee.",
                    choices: function () {
                        let choiceArray = [];
                        res.forEach(emp => {
                            choiceArray.push(emp.name);
                        });
                        return choiceArray;
                    }
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Select the new manager.",
                    choices: function () {
                        let choiceArray = ["None"];
                        res.forEach(emp => {
                            choiceArray.push(emp.name);
                        });
                        return choiceArray;
                    }
                }
            ])
            .then(function ({ name, manager }) {
                manager = name === manager || name === "None" ? null : manager;
                let newManagerId = null;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].name === manager) {
                        newManagerId = res[i].id;
                        break;
                    }
                }
                newManagerId = newManagerId === null ? null : parseInt(newManagerId);
                const query = Employee.prototype.updateQuery;
                connection.query(query, [{ manager_id: newManagerId }, name], function (err, res) {
                    if (err)
                        throw err;
                    console.log("\nUpdated employee's manager\n");
                    init();
                });
            });
    });
}

function deleteDepartment() {
    const query = Department.prototype.viewQuery;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        
        inquirer
            .prompt({
                name: "name",
                type: "list",
                message: "Select the department.",
                choices: function () {
                    let choiceArray = [];
                    res.forEach(dep => {
                        choiceArray.push(dep.name);
                    });
                    return choiceArray;
                }
        })
            .then(function ({ name }) {
                const query = Department.prototype.deleteQuery;
                connection.query(query, { name }, function (err, res) {
                    if (err)
                        throw err;
                    
                    console.log("\nDeleted department\n");
                    init();
                });
            });
    });
}

function deleteRole() {
    const query = `SELECT * FROM role`;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        
        inquirer
            .prompt({
                name: "title",
                type: "list",
                message: "Select the role.",
                choices: function () {
                    let choiceArray = [];
                    res.forEach(role => {
                        choiceArray.push(role.title);
                    });
                    return choiceArray;
                }
        })
            .then(function ({ title }) {
                const query = Role.prototype.deleteQuery;
                connection.query(query, { title }, function (err, res) {
                    if (err)
                        throw err;
                    
                    console.log("\nDeleted role\n");
                    init();
                });
            });
    });
}

function deleteEmployee() {
    const query = `SELECT CONCAT(first_name, " ", last_name) name FROM employee`;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
        
        inquirer
            .prompt({
                name: "name",
                type: "list",
                message: "Select the employee.",
                choices: function () {
                    let choiceArray = [];
                    res.forEach(emp => {
                        choiceArray.push(emp.name);
                    });
                    return choiceArray;
                }
        })
            .then(function ({ name }) {
                const query = Employee.prototype.deleteQuery;
                connection.query(query, name, function (err, res) {
                    if (err)
                        throw err;
                    
                    console.log("\nDeleted employee\n");
                    init();
                });
            });
    });
}

function viewDepartmentSalary() {
    const query = Department.prototype.viewQuery;
    connection.query(query, function (err, res) {
        if (err)
            throw err;
    
        inquirer
            .prompt({
                name: "name",
                type: "list",
                message: "Select the department.",
                choices: function () {
                    let choiceArray = [];
                    res.forEach(dep => {
                        choiceArray.push(dep.name);
                    });
                    return choiceArray;
                }
            })
            .then(function ({ name }) {
                console.log();
                const query = Department.prototype.viewSalaryQuery;
                connection.query(query, { name }, function (err, res) {
                    console.table(res);
                    init();
                });
            });
    });
}