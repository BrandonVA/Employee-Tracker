const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table')

const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "yourPassword",
    // name of database
    database: "employee_db", 
    multipleStatements: true
});


connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    require('./prompts/start')(connection);
});