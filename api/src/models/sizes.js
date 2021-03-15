const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Sizes = sequelize.define('sizes', {
        ar: { type: DataTypes.REAL,
            allowNull: false,
            primaryKey: true 
        }/* ,
        br:{
            type: DataTypes.REAL, 
            allowNull: false
        },
        eur:{
            type: DataTypes.REAL, 
            allowNull: false
        },
        uk:{
            type: DataTypes.REAL, 
            allowNull: false
        },
        us:{
            type: DataTypes.REAL, 
            allowNull: false
        },
        cm:{
            type: DataTypes.REAL, 
            allowNull: false
        } */
    })
}