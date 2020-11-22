const inquirer = require('inquirer');

module.exports = (connection) => {
    connection.query('SELECT * FROM employee', (err, res) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'What Employee would you like to delete?',
                choices: function () {
                    const employeeArray = []
                    for (let i = 0; i < res.length; i++) {
                        employeeArray.push(`${res[i].first_name} ${res[i].last_name}`)
                    }
                    return employeeArray;
                },
                filter: function (val) {
                    for (let i = 0; i < res.length; i++) {
                        const employeeFullName = `${res[i].first_name} ${res[i].last_name}`
                        if (val === employeeFullName) {
                            val = res[i].id;
                            return val;
                        }
                    }
                }
            }
        ]).then(response => {
            let employeeToDelete = response.id;
            console.log(employeeToDelete);
            require('../db/dbCalls/removingData/deleteEmployee')(connection, employeeToDelete);
        })
    })
}