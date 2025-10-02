const customers = require('./customers.js');

function getAllCustomers(req, res) {
    let results = customers

    if(req.query.gender){
        results = results.filter((customer) => customer.gender.toLowerCase() == req.query.gender.toLowerCase());
    }

    if(req.query.age){
        const inputAge = parseInt(req.query.age);

        const getAge = (birthday) => {
            const today = new Date();
            const dob = new Date(birthday);
            let age = today.getFullYear() - dob.getFullYear();
            return age;
        }
        results = results.filter((customer) =>getAge(customer.birthday) == inputAge);
        
    }

    if(req.query.createdFrom && req.query.createdTil){
        results = results.filter((date) => date.createdAt >= req.query.createdFrom && date.createdAt <= req.query.createdTil);
    }

    return res.send(results);
}
module.exports = {
    getAllCustomers
};