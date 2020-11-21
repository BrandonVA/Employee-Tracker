module.exports = async (connection) => {
    const query = `SELECT * FROM employee`
    
    return Promise.resolve(
        connection.query(query, (err, res) => {
            // let employees = [];
            console.table(res);
            require('../../prompts/start')(connection);

            // res.forEach(item => employees.push(item.first_name) );
            // console.log(employees);
    
        })
    )



}