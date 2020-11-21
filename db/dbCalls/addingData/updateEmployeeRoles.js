module.exports = (connection, data) => {
    const {employee_id, newRole_id} = data;
    const query = `UPDATE employee SET role_id = ${newRole_id} WHERE employee.id = ${employee_id}`
    connection.query(query, data, (err, res) =>{
        if (err) throw err;
        console.log(res.affectedRows + " Employee Updated!\n");
        require('../../../prompts/start')(connection);
    })
}