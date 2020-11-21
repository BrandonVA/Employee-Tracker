module.exports = (connection, data) => {
    const query = `INSERT INTO role SET ?`
    connection.query(query, data, (err, res) =>{
        if (err) throw err;
        // console.log(res.affectedRows + " product inserted!\n");
        require('../../../prompts/start')(connection);
    })
}