module.exports = (connection, data) => {
    const query = `INSERT INTO department SET ?`
    connection.query(query, data, (err, res) =>{
        if (err) throw err;
        console.log("Added Department!\n");
        require('../../../prompts/start')(connection);
    })
}