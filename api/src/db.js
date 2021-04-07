require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const payment = require('./models/payment');


const {
    DB_USER, DB_PASSWORD, DB_HOST,  DB_NAME
} = process.env;

const sequelize = process.env.NODE_ENV === "production" ? 

    new Sequelize({

        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
            max: 3,
            min: 1,
            idle: 10000,
        },
        dialectOptions: {
            ssl: {
             require: true,
             rejectUnauthorized: false,
            },
            keepAlive: true,
        },
        ssl: true,
    })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/RunningDeportes`, {

        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed

    })
;
  


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
});

// Injectamos la conexion (sequelize) a todos los modelos

modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Products, Images, Sizes, Stock, User, Order, Quantity, Payment} = sequelize.models;


//relaciones

//el producto va a tener muchas images

Products.hasMany(Images);

//sizes y productos se relacionan mxm en tabla stock

Products.belongsToMany(Sizes, { through: 'stock', foreignKey: 'id'});
Sizes.belongsToMany(Products, { through: 'stock', foreignKey: 'ar'});

//Products y order se relacionan mxm en tabla order_products

Products.belongsToMany(Order, { through: 'quantity', foreignKey: 'products'});
Order.belongsToMany(Products, { through: 'quantity', foreignKey: 'order'});

//el user va a tener muchas ordenes

User.hasMany(Order);

//las Cantidades tienen un talle

Sizes.belongsToMany(Quantity, { through: 'sizequan', foreignKey: 'ar'});
Quantity.belongsToMany(Sizes, { through: 'sizequan', foreignKey: 'id'});


//el pago es de una orden

Order.hasOne(Payment);



module.exports = {
    ...sequelize.models,
    conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
  