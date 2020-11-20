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
    database: "employee_db" // name of database
});


connection.connect( (err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    //   run management system here
    
});

const getAllEmployees = () => {
    const query = `select * from employee`
    connection.query(query, (err,res) => {
        console.table(res);
        
    })
}
// getAllEmployees()

const getEmployeeByManager = () => {
    const query = `select * from employee where manager_id = 1`
    connection.query(query, (err,res) => {
        console.table(res);
        
    })
}
// getEmployeeByManager()

const getEmployeeByRole = () => {
    const query = `select * from employee where role_id = 2`
    connection.query(query, (err,res) => {
        console.table(res);
        
    })
}
// getEmployeeByRole()
const getEmployeeData = async () => {

    let roles = await require('./db/dbCalls/getEmployees')(connection);
    console.log(`These are the roles: ${roles}`);
}

getEmployeeData() 

// const getAllRoles = () => {
//     const query = `select * from role`
//     connection.query(query, (err,res) => {
//         console.table(res);
//         connection.end()
//     })

// }
// getAllRoles()
require('./db/dbCalls/getRoles')(connection)

