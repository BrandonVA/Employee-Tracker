module.exports = (array, val) => {
    let fullName = val;
    for (let i = 0; i < array.length; i++) {
        let managerName = `${array[i].first_name} ${array[i].last_name}`
        if (managerName === fullName) {
            fullName = array[i].id
            return fullName;
        }
    }
}


