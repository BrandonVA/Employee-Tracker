const testing = async (connection) => {
    const query = `SELECT * FROM employee`
    return Promise.resolve(
        connection.query(query, (err, res) => {
            console.table(res);
            require('../../prompts/start')(connection);
        })
    )
}
module.exports = testing;