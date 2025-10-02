const orders = require('./orders.js');

function getAllOrders(req, res) {
    let results = orders

    if(req.query.status){
        results = results.filter((order) => order.status.toLowerCase() == req.query.status.toLowerCase());
        
    }

    if(req.query.amountFrom && req.query.amountTo){
        const amountFrom = parseFloat(req.query.amountFrom);
        const amountTo = parseFloat(req.query.amountTo);
        results = results.filter((amount) => amount.totalAmount >= amountFrom&&amount.totalAmount <= amountTo);
        
    }


    return res.send(results)

}

module.exports = {
    getAllOrders
};