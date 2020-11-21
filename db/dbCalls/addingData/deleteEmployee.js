module.exports = (connection, data) => {
    const query = `DELETE FROM employee WHERE id = ?`
    connection.query(query, data, (err, res) =>{
        if (err) throw err;
        console.log(res.affectedRows + " Employee Removed\n");
        require('../../../prompts/start')(connection);
    })
}