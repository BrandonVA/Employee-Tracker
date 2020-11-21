const inquirer = require('inquirer');

const checkResponse = async (querySearch, connection) => {

    switch(querySearch) {
        case 'Search Employees': 
            require('../db/dbCalls/getEmployees')(connection)
        break;
        case 'Search Roles' : 
            require('../db/dbCalls/getRoles')(connection);
        break;
        case 'Search Departments': 
            require('../db/dbCalls/getDepartments')(connection);
        break;
        case 'View All Employees and data': 
            require('../db/dbCalls/viewAllData')(connection);
        break;
        case 'Add Employee':
            // add employee call
            require('./buildEmployee')(connection);
        break;
        case 'Delete Employee':
            require('./employeeToDelete')(connection);
        break;
        case 'Add new role':
            require('./roleData')(connection);
        break;
        case 'Add new department':
            require('./departmentData')(connection);
        break;
        case 'Update Employees Role':
            require('./setNewRole')(connection);
        break;
        case 'Exit':
            connection.end();
        break;
    }
}

module.exports =  async (connection) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'test',
                message: 'What would you like to do?',
                choices: [
                    'Search Employees',
                    'Search Roles',
                    'Search Departments',
                    'View All Employees and data',
                    'Add Employee',
                    'Delete Employee',
                    'Add new role',
                    'Add new department',
                    'Update Employees Role',
                    'Exit'
                ]
            }
        ]).then(response => {
            let querySearch = response.test
            checkResponse(querySearch,connection)
        })
}





