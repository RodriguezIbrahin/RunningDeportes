const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Quantity = sequelize.define('quantity', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    })
} 
