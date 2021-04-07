const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Payment = sequelize.define('payment', {

        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        point:{
            type: DataTypes.STRING, 
            allowNull: false
        },

        day:{
            type: DataTypes.STRING, 
            allowNull: false
        },

        name:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        
        bank:{
            type: DataTypes.STRING,
        },

        card_name:{
            type: DataTypes.STRING, 
        },

        card_number: { 
            type: DataTypes.STRING, 
        }
    })
}