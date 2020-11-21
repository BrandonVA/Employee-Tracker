module.exports = (connection, data) => {
    const query = `UPDATE employee SET role_id = ${data}`
    connection.query(query, data, (err, res) =>{
        if (err) throw err;
        console.log(res.affectedRows + "Employee Updated!\n");
        // require('../../../prompts/start')(connection);
    })
}