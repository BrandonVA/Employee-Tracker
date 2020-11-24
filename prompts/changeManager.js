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
                    const listOfEmployees = [];
                    for (let i = 0; i < employeeList.length; i++) {
                        listOfEmployees.push(`${employeeList[i].first_name} ${employeeList[i].last_name}`);
                    }
                    return listOfEmployees;
                },
                filter: function(val) {
                    for (let i = 0; i < employeeList.length; i++) {
                        let employee = `${employeeList[i].first_name} ${employeeList[i].last_name}`
                        if (val === employee) {
                            val = employeeList[i].id;
                            return val;
                        }
                    }
                },
            },
            {
                type: 'list',
                message: 'What is the new manger for the employee',
                name: 'newManager_id',
                choices: function() {
                    let listOfMangers = []
                    for (let i = 0; i < managerList.length; i++) {
                        listOfMangers.push(`${managerList[i].first_name} ${managerList[i].last_name}`)
                    }
                    return listOfMangers;
                },
                filter: function(val) {
                    for (let i = 0; i < managerList.length; i++) {
                        if (val === `${managerList[i].first_name} ${managerList[i].last_name}`) {
                            return managerList[i].id;
                        }
                    }
                }
            }
        ]).then(response => {
            console.log(response);
            require('../db/dbCalls/addingData/updateManager')(connection, response);
        })
    })
}