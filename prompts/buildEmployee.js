const inquirer = require('inquirer');

module.exports = (connection) => {

    connection.query('select * from employee; SELECT * FROM role;', (err, results, fields) => {
        inquirer.prompt([
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
                    let counter = results[1].length
                    for (let i = 0; i < counter; i++) {
                        roleArray.push(results[1][i].title)
                    }
                    return roleArray;
                },
                filter: function (val) {
                    for (let i = 0; i < results[1].length; i++) {
                        if (results[1][i].title === val) {
                            val = results[1][i].id;
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
                    // console.log(employeeResults[0].title);
                    let managerArray = [];
                    let counter = results[0].length
                    for (let i = 0; i < counter; i++) {
                        if (results[0][i].manager_id === null) {
                            managerArray.push(`${results[0][i].first_name} ${results[0][i].last_name}`)
                        }
                    }
                    return managerArray;
                },
                filter: function (val) {
                    for (let i = 0; i < results[0].length; i++) {
                        let managerName = `${results[0][i].first_name} ${results[0][i].last_name}`
                        if (managerName === val) {
                            val = results[0][i].id
                            return val;
                        }
                    }
                }
            },
        ]).then(newEmployeeData => {
            require('../db/dbCalls/addingData/newEmployee')(connection, newEmployeeData);
        })
    })
}