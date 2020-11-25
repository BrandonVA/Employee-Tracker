const inquirer = require('inquirer');

module.exports = (connection) => {
    connection.query('SELECT * FROM role', (err, res) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'What Department would you like to delete?',
                choices: function () {
                    const roleList = []
                    for (let i = 0; i < res.length; i++) {
                        roleList.push(res[i].title);
                    }
                    return roleList;
                },
                filter: function (val) {
                    for (let i = 0; i < res.length; i++) {
                        if (val === res[i].title) {
                            val = res[i].id;
                            return val;
                        }
                    }
                }
            }
        ]).then(response => {
            require('../db/dbCalls/removingData/deleteRole')(connection, response.id);
        })
    })
}