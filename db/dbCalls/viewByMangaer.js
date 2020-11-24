module.exports = (connection, data) => {
    const query = `SELECT * FROM employee WHERE manager_id = ${data}`
    connection.query(query, (err, res) => {
        console.table(res);
        require('../../prompts/start')(connection);
    })

}