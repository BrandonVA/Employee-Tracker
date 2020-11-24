module.exports = (array) => {
    let fullNames = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].manager_id === null) {
            fullNames.push(`${array[i].first_name} ${array[i].last_name}`)
        }
    }
    return fullNames;
}