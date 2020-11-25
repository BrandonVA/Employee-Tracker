const inquirer = require('inquirer');

module.exports = (connection) => {
    connection.query('SELECT * FROM department', (err, res) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'What Department would you like to delete?',
                choices: function () {
                    const departmentList = []
                    for (let i = 0; i < res.length; i++) {
                        departmentList.push(res[i].department_name);
                    }
                    return departmentList;
                },
                filter: function (val) {
                    for (let i = 0; i < res.length; i++) {
                        if (val === res[i].department_name) {
                            val = res[i].id;
                            return val;
                        }
                    }
                }
            }
        ]).then(response => {
            console.log(response.id);
            require('../db/dbCalls/removingData/departmentToDelete')(connection, response.id);
        })
    })
}