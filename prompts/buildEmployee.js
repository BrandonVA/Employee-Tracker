const inquirer = require('inquirer');

module.exports = (connection) => {

    connection.query('select * from employee; SELECT * FROM role;', (err, results, fields) => {
        let mangerResults = results[0];
        let roleResults = results[1];
        inquirer.prompt([
            {
                type: 'list',
                name: 'typeOfEmployee',
                message: 'What type of employee would you like to add',
                choices: ['Manager', 'Employee'],
                filter: function(val) {
                    if (val === 'Manager'){
                        return false
                    } else {
                        return true;
                    }
                }
            }
        ]).then(response => {
            inquirer.prompt([
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
            {
                type: 'list',
                message: 'Employees manager',
                name: 'manager_id',
                choices: function () {
                    if (response.typeOfEmployee) {
                        let managerArray = [];
                        let counter = mangerResults.length
                        for (let i = 0; i < counter; i++) {
                            if (mangerResults[i].manager_id === null) {
                                managerArray.push(`${mangerResults[i].first_name} ${mangerResults[i].last_name}`)
                            }
                        }
                        return managerArray;
                    } else {
                        return ['n/a'];
                    }

                },
                filter: function (val) {
                    if (response.typeOfEmployee) {
                        for (let i = 0; i < mangerResults.length; i++) {
                            let managerName = `${mangerResults[i].first_name} ${mangerResults[i].last_name}`
                            if (managerName === val) {
                                val = mangerResults[i].id
                                return val;
                            }
                        }
                    } else {
                        return null;
                    }

                }
            },
        ]).then(newEmployeeData => {
            console.log(newEmployeeData);
            require('../db/dbCalls/addingData/newEmployee')(connection, newEmployeeData);
        })
        })
    })
}