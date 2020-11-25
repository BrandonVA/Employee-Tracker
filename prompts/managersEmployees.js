const inquirer = require('inquirer');

module.exports = connection => {
    connection.query('SELECT * from employee where manager_id IS NULL;', (err, results) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'managers_id',
                message: 'What managers employees would you like to see.',
                choices: function() {
                    return require('./scripts/returnFullName')(results);
                },
                filter: function(val) {
                    return require('./scripts/returnIdFromName')(results, val);
                }
            }
        ]).then(response => {
            require('../db/dbCalls/viewByManager')(connection, response.managers_id);
        })
    })

}