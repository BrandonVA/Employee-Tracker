module.exports = (connection, data) => {
    const query = `DELETE FROM department WHERE id = ?`
    connection.query(query, data, (err, res) =>{
        if (err) throw err;
        console.log(res.affectedRows + " Department Removed\n");
        require('../../../prompts/start')(connection);
    })
}