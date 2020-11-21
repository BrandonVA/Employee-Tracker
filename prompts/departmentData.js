const inquirer = require('inquirer');

module.exports = (connection) => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Whats the departments name?',
            name: 'department_name',
        },
    ]).then(department => {
        console.log(department);
        require('../db/dbCalls/addingData/newDepartment')(connection, department);
    })
}