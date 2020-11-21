const inquirer = require('inquirer');

module.exports = (connection) => {

    connection.query('SELECT * FROM role;', (err, results) => {
        console.table(results)
        // inquirer.prompt([
        //     {
        //         type: 'input',
        //         message: 'Whats the departments name?',
        //         name: 'department_name',
        //     },
        // ]).then(department => {
        //     console.log(department);
        //     require('../db/dbCalls/addingData/newDepartment')(connection, department);
        // })
    })
}