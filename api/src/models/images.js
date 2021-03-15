const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Images = sequelize.define('images', {
        
        img:{
            type: DataTypes.STRING, 
            allowNull: false
        }
    })
}