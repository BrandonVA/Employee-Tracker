const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager_id
FROM employee
JOIN role ON employee.role_id = role.id
join department on role.department_id = department.id `

module.exports = (connection) => {
    connection.query(query, (err, results) => {

        connection.query('select * from employee', (err, res) => {
            results.forEach(employee => {
                if (employee.manager_id !== null) {
                    res.forEach(nestedEmployee => {
                        if (nestedEmployee.id === employee.manager_id) {
                            employee.manager_id = `${nestedEmployee.first_name} ${nestedEmployee.last_name}`
                        }
                    })
                }
            });
            console.table(results);
            require('../../prompts/start')(connection);
        })
    })
}