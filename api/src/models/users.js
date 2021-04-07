const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const User = sequelize.define('user', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        rol: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
        },

    })
}