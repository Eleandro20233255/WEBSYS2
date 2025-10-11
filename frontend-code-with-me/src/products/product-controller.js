const products = require('./products.js');

function getAllProducts(req, res) {
    let result = products;
    
    if(req.query.name){
        result = result.filter((product) => product.name.toLowerCase().includes(req.query.name.toLowerCase()));
        
    }

    if(req.query.description){
        result = result.filter((product) => product.description.toLowerCase().includes(req.query.description.toLowerCase()));
        
    }

    if(req.query.priceFrom && req.query.priceTo){
        const priceFrom = parseFloat(req.query.priceFrom);
        const priceTo = parseFloat(req.query.priceTo);
        result = result.filter((product) => product.price >= priceFrom && product.price <= priceTo);
        
    }

    if(req.query.stockFrom && req.query.stockTo){
        const stockFrom = parseInt(req.query.stockFrom);
        const stockTo = parseInt(req.query.stockTo);
        result = result.filter((product) => product.stock >= stockFrom && product.stock <= stockTo);
        
    }

    return res.send(result);

}

module.exports = {
    getAllProducts
};