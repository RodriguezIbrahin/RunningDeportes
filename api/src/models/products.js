const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Products = sequelize.define('products', {

        name:{
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
        },
        price:{
            type: DataTypes.REAL, 
            allowNull: false
        },
        pricelister:{
            type: DataTypes.REAL, 
            allowNull: false
        },
        description:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        marca:{
            type: DataTypes.STRING, 
            allowNull: false
        }
    })
}