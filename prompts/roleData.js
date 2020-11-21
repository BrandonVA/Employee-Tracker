const inquirer = require('inquirer');

module.exports = (connection) => {

    connection.query('SELECT * from department;', (err, results) => {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Whats the roles title?',
                name: 'title',
            },
            {
                type: 'input',
                message: 'Whats the salary for this role?',
                name: 'salary',
            },
            {
                type: 'list',
                message: 'Whats Department does this role belong to?',
                name: 'Department_id',
                choices: function() {
                    const departmentList = []
                    for(let i = 0; i < results.length; i++) {
                        departmentList.push(results[i].department_name)
                    }
                    return departmentList;
                },
                filter: function(val) {
                    for(let i = 0; i < results.length; i++) {
                        if (val === results[i].department_name) {
                            val = results[i].id
                            console.log(val);
                            console.log(results[i].id);
                            return val;
                        }
                    }
                }
            },
 
        ]).then(role => {
            require('../db/dbCalls/addingData/newRole')(connection, role)
        })
    })
}