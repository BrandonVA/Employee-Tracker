const inquirer = require('inquirer');

module.exports = (connection) => {
    const query = `SELECT employee.first_name, employee.last_name, employee.role_id, role.id, role.salary, department.id, department.department_name
    FROM employee
    JOIN role ON employee.role_id = role.id
    join department on role.department_id = department.id; SELECT * FROM department`;

    connection.query(query, (err, results) => {
        if (err) throw err;
        
        const allData = results[0];
        const allDepartments = results[1]

        inquirer.prompt([
            {
                type: 'list',
                name: 'department_name',
                message: 'What departments budget would tou like to view?',
                choices: function() {
                    const departmentList = [];
                    for(let i = 0; i < allDepartments.length; i++) {
                        departmentList.push(allDepartments[i].department_name);
                    }
                    return departmentList;
                }
            }
        ]).then(response => {
            let counter = 0;
            allData.forEach(element => {
                if(element.department_name === response.department_name) {
                    counter += element.salary
                }
            });

            let message = `The total budget for: ${response.department_name} is ${counter}`;
            console.log(message);
            console.log('\n');

            require('./start')(connection);
            
        })
        
        
    })
}