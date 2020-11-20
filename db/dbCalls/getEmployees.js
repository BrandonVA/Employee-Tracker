module.exports = async (connection) => {
    const query = `select * from employee`
    
    return Promise.resolve(
        connection.query(query, (err, res) => {
            let employees = [];
            console.table(res);
            // console.log(res);
            res.forEach(item => employees.push(item.first_name) );
            console.log(employees);
            return employees;
    
        })
    )



}