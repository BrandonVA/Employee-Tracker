const inquirer = require('inquirer');

module.exports = connection => {
    connection.query('SELECT * from employee where manager_id IS NULL;', (err, results) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'managers_id',
                message: 'What managers employees would you like to see.',
                choices: function() {
                    let array = [];
                    for (let i = 0; i < results.length; i ++) {
                        array.push(results[i].first_name);
                    }
                    return array;
                }
            }
        ]).then(response => {
            console.log(response);
        })
    })

}