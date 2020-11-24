const inquirer = require('inquirer');

module.exports = (connection) => {

    connection.query('SELECT * FROM role; SELECT * FROM employee;', (err, results) => {
        const roleData = results[0];
        const employeeData = results[1];
        console.table(roleData);
        console.table(employeeData);
        inquirer.prompt([
            {
                type: 'list',
                message: 'What employee do you want to assign a new role for?',
                name: 'employee_id',
                choices: function() {
                    return require('./scripts/returnFullName')(employeeData);
                },
                filter: function(val) {
                    return require('./scripts/returnIdFromName')(employeeData, val);
                }
            },
            {
                type: 'list',
                message: 'What the new role you would like to assign',
                name: 'newRole_id',
                choices: function() {
                    let roleChoices = [];
                    for (let i = 0; i < roleData.length; i ++) {
                        roleChoices.push(roleData[i].title);
                    }
                    return roleChoices;
                },
                filter: function(val) {
                    for (let i = 0; i < roleData.length; i ++) {
                        if (val === roleData[i].title) {
                            val = roleData[i].id;
                            return val;
                        }
                    }
                }
            }
        ]).then(response => {
            require('../db/dbCalls/addingData/updateEmployeeRoles')(connection, response);
        })
    })
}