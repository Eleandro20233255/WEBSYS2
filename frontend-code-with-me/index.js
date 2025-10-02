const express = require('express');
const app = express();
app.use(express.json());

const productRoutes = require('./src/products/products-route.js');
const customerRoutes = require('./src/customers/customer-route.js');
const orderRoutes = require('./src/orders/order-route.js');

app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

app.listen(8000, () => console.log("server is running on port 8000"));