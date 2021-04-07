const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Sizequan = sequelize.define('sizequan', {
        quantity:{
            type: DataTypes.REAL, 
            allowNull: false
        },
    })
} 
