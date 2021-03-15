const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Stock = sequelize.define('stock', {
        stock:{
            type: DataTypes.REAL, 
            allowNull: false
        }
    })
} 
