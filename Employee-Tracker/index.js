const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "FireEmblemHeroes",
    database: "business_db"
});

connection.connect((err) => {
    if (err)
        throw err;
    
});

function afterConnection() {
    connection.query('SELECT * FROM employee WHERE genre', function (err, results, fields) {
        if (err)
            throw err;
        console.log(results);
        connection.end();
    });
}