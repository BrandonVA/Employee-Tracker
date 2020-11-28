const inquirer = require('inquirer');

module.exports = (connection) => {
    connection.query('select * from employee where manager_id IS NULL; SELECT * FROM role;', (err, results, fields) => {
        // Holds a reference fo the different select statements from the db
        let managersResults = results[0];
        console.table(managersResults);
        let roleResults = results[1];

        // Questions asked to build a new employee.
        const questions = [
            {
                type: 'input',
                message: 'Employees first name',
                name: 'first_name',
            },
            {
                type: 'input',
                message: 'Employees first name',
                name: 'first_name',
            },
            {
                type: 'input',
                message: 'Employees last name',
                name: 'last_name',
            },
            {
                type: 'list',
                message: 'Employees role',
                name: 'role_id',
                choices: function () {
                    let roleArray = [];
                    let counter = roleResults.length
                    for (let i = 0; i < counter; i++) {
                        roleArray.push(roleResults[i].title)
                    }
                    return roleArray;
                },
                filter: function (val) {
                    for (let i = 0; i < roleResults.length; i++) {
                        if (roleResults[i].title === val) {
                            val = roleResults[i].id;
                            return val;
                        }
                    }
                }
            },
        ]

        // If the employee being added isn't a manager ask them who is the manager for that employee.
        const addManger = {
            type: 'list',
            message: 'Employees manager',
            name: 'manager_id',
            choices: function () {
                return require('./scripts/returnFullName')(managersResults);
            },
            filter: function (val) {
                return require('./scripts/returnIdFromName')(managersResults, val);
            }
        }

        // Function to initiate the first 3 questions for the employees data.
        const askQuestions = () => {
            inquirer.prompt(questions)
                .then(newEmployeeData => {
                    console.log(newEmployeeData);
                    require('../db/dbCalls/addingData/newEmployee')(connection, newEmployeeData);
                })
        }


        // Initial prompt for asking if the employee being added is a manager or not.
        inquirer.prompt([
            {
                type: 'list',
                name: 'typeOfEmployee',
                message: 'What type of employee would you like to add',
                choices: ['Manager', 'Employee'],
                filter: function (val) {
                    if (val === 'Manager') {
                        return true
                    } else {
                        return false;
                    }
                }
            }
        ]).then(response => {
            // If the employee is a manager build basic data for the manager.
            if (response.typeOfEmployee) {
                askQuestions();
            } else {
                // If the employee isn't a manager push another question to the array of questions and who is their manager.
                questions.push(addManger);
                askQuestions();
            }
        })
    })
}