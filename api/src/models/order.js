const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Order = sequelize.define('order', {
        status: {
            type: DataTypes.ENUM("open", "cancelle", "confirmed"),
            defaultValue: "open",
        },
    })
} 
