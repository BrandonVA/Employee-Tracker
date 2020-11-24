const inquirer = require('inquirer');

module.exports = connection => {
    connection.query('SELECT * FROM employee;', (err, results) => {
        const employeeList = results.filter(employee => employee.manager_id !== null);
        const managerList = results.filter(employee => employee.manager_id === null);
        console.table(employeeList);
        console.table(managerList);
        inquirer.prompt([
            {
                type: 'list',
                message: 'What employee would you like to assign to a new manager?',
                name: 'employee_id',
                choices: function() {
                    return require('./scripts/returnFullName')(employeeList);
                },
                filter: function(val) {
                    return require('./scripts/returnIdFromName')(employeeList, val);
                },
            },
            {
                type: 'list',
                message: 'What is the new manger for the employee',
                name: 'newManager_id',
                choices: function() {
                    return require('./scripts/returnFullName')(managerList);
                },
                filter: function(val) {
                    return require('./scripts/returnIdFromName')(managerList, val);
                }
            }
        ]).then(response => {
            console.log(response);
            require('../db/dbCalls/addingData/updateManager')(connection, response);
        })
    })
}