const testing = async (connection) => {
    const query = `SELECT * FROM employee`
    
    return Promise.resolve(
        connection.query(query, (err, res) => {
            // let employees = [];
            console.table(res);
            

            // res.forEach(item => {
            //     let obj = {
            //         first_name: item.first_name,
            //         last_name: item.last_name,
            //         role_id: item.role_id,
            //         manager_id: item.manager_id,
            //     }
            //     employees.push(obj) 
            // });
            // console.log(employees);
            require('../../prompts/start')(connection);
            // return employees;
    
        })
    )

}

module.exports = testing;