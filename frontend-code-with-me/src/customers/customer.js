const {DataTypes} = require('sequelize');

const sequelize = require('../sequelize');

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes, INTEGER,
        primaryKey:true
    },
    firstname: {
        type: DataTypes, STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes, STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes, STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes, DATE,
        allowNull: false,
    },
    birthday: {
        type: DataTypes, DATE,
        allowNull: false,
    },
})
console.log(Customer === sequelize.models.Customer);