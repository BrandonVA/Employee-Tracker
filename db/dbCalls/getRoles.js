module.exports = (connection) => {
    const query = `select * from role`;
    connection.query(query, (err, res) => {
        console.table(res);
        // connection.end()
        require('../../prompts/start')(connection);
    })

}