const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "FireEmblemHeroes",
    database: "business_db"
});

connection.query(
    'SELECT * FROM employee',
    function (err, results, fields) {
        console.log(results);
    }
);