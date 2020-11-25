module.exports = (connection, data) => {
    const query = `DELETE FROM role WHERE id = ?`
    connection.query(query, data, (err, res) =>{
        if (err) throw err;
        console.log(res.affectedRows + " Role Removed\n");
        require('../../../prompts/start')(connection);
    })
}