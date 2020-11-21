module.exports = async (connection) => {
    const query = `SELECT * FROM department`
    connection.query( query, (err, result) => {
        console.table(result);
        require('../../prompts/start')(connection);
    })
}