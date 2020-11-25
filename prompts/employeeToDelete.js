const inquirer = require('inquirer');

module.exports = (connection) => {
    connection.query('SELECT * FROM employee', (err, res) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'What Employee would you like to delete?',
                choices: function () {
                    return require('./scripts/returnFullName')(res);
                },
                filter: function (val) {
                    return require('./scripts/returnIdFromName')(res,val);
                }
            }
        ]).then(response => {
            let employeeToDelete = response.id;
            console.log(employeeToDelete);
            require('../db/dbCalls/removingData/deleteEmployee')(connection, employeeToDelete);
        })
    })
}