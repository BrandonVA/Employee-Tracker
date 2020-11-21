const inquirer = require('inquirer');



module.exports =  async (connection) => {
    // Promise.return(
        // require('../db/dbCalls/viewAllData')(connection);
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
                    'Exit'
                ]
            }
        ]).then(response => {

            let querySearch = response.test

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
                case 'Exit':
                    connection.end();
                break;
            }


            // if (querySearch === 'Search Employees') {
            //       console.log('searching db for employees');
            //       require('../db/dbCalls/getEmployees')(connection)
            // } else if (querySearch === 'Search Roles') {
            //     console.log("hello 1");
            //     require('../db/dbCalls/getRoles')(connection)
            // } else if (querySearch === 'Search Departments') {
            //     console.log('Hello 2');
            //     require('../db/dbCalls/getDepartments')(connection)
            // } else if ( querySearch === 'View All Employees and data') {
            //     require('../db/dbCalls/viewAllData')(connection)
            // }else if (querySearch === 'Exit') {
            //     connection.end()
            // }
        })
    // )

}
