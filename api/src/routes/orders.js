const app = require('express').Router();
const { Products, Sizes, Images , Stock, Order, Quantity, Sizequan, Payment} = require('../db.js');
const authConfig = require('../auth');
const jwt = require("jsonwebtoken");


//retornar todas las ordenes

app.get('/', (req, res) => {

	let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) : decoded.rol !== "admin" ? res.status(403).send( { message: "no tiene permisos"} ) :

        (async function (){

            try {
    
                const order = await Order.findAll({ where: { status: "confirmed" }, include: [{ model: Products, include: [{ model: Images }] }], order: [["id", "DESC"],[Products, 'id', 'ASC' ]] });

                let orderList = [];

                const ordermap = await Promise.all( order.map( async orde => { 

                    let payment = {type: "no payment"}

                    if(orde.status === "confirmed"){
                        payment = await Payment.findOne({ where: {orderId: orde.id}});
                    }  
                    
                    let products = [];

                    const ordemap = await Promise.all( orde.products.map(async product =>{  

                        const sizequa = await Sizequan.findAll({ where: { id: product.quantity.id }, order: [['ar', 'ASC']]});

                        sizequa.map(sizequa => products.push({ id: product.id, name: product.name, price: product.price, pricelister: product.pricelister, images: product.images[0].img, quantity: sizequa.quantity, size: sizequa.ar }))

                    }));

                    orderList.push({ order: orde.id, status: orde.status, products, payment })

                }))

                res.status(201).send(orderList);
    
            }
            catch (err){ res.status(404).send(err) }

        })()

	});
});



module.exports = app;