const app = require('express').Router();
const { Products, Sizes, Images , Stock, Order, Quantity, Sizequan, Payment } = require('../db.js');

const authConfig = require('../auth');
const jwt = require("jsonwebtoken");



//retornar todas las ordenes del user logeado

app.get('/', (req, res) => {

	let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) :

        (async function (){

            try {
    
                const order = await Order.findAll({ where: { userId: decoded.id }, include: [{ model: Products, include: [{ model: Images }] }] });

                let orderList = [];

                const ordermap = await Promise.all( order.map( async orde => { 

                    let products = [];

                    const ordemap = await Promise.all( orde.products.map(async product =>{  

                        const sizequa = await Sizequan.findAll({ where: { id: product.quantity.id }});

                        sizequa.map(sizequa => products.push({ id: product.id, name: product.name, price: product.price, pricelister: product.pricelister, images: product.images[0].img, quantity: sizequa.quantity, size: sizequa.ar }))

                    }));

                    orderList.push({ order: orde.id, status: orde.status, products })
                    
                }))

                res.status(201).send(orderList);
    
            }
            catch (err){ res.status(404).send(err) }

        })()

	});
	
});



//retornar las ordenes del user logeado segun status

app.get('/:status', (req, res) => {

	let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) :

        (async function (){

            try {
    
                const order = await Order.findAll({ where: { userId: decoded.id, status: req.params.status }, include: [{ model: Products, include: [{ model: Images }] }], order: [["id", "DESC"],[Products, 'id', 'ASC' ]] });

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



//Comprar Usuario logeado

app.post('/', (req, res) => {

	let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) :

		(async function (){

            try {
    
                const order = await Order.findOne({ where: { userId: decoded.id, status: "open" }, include: [Products] });

                if( order && !order.products.length ){

                    res.status(403).send({ message: "order without product" });

                }
                if( !order ){

                    res.status(403).send({ message: "not order" });

                }
                if( order && order.products.length ){

                    let stocksInOrder =[];

                    const stocks = await Promise.all( order.products.map( async product => {

                        const quantityAll = await Sizequan.findAll({ where: { id: product.quantity.id }});

                        let quantitySize = quantityAll.map((quan) => ( stocksInOrder.push({ products: product.quantity.products, ar: quan.ar, quantity: quan.quantity }) ));

                    }));

                    const availableStock = await Promise.all( stocksInOrder.map( async stock => {

                        const sto = await Stock.findOne({ where: { ar: stock.ar, id: stock.products }});

                        if( sto.stock < stock.quantity ){ return{ message: `Not Stock in size ${stock.ar}` }}

                        else return ( { stock: sto.stock - stock.quantity, ar: stock.ar, id: stock.products });

                    }));

                    let noStock = []; let yesStock = [];

                    availableStock.map((available) =>{

                        if( available.message ){ noStock.push(available) }
                        else yesStock.push( available )
                        
                    });

                    if( noStock.length ){ res.status(403).send(noStock) }

                    else if ( yesStock.length ){

                        const updateStock = await Promise.all( yesStock.map( async yes => {

                            const update = await Stock.update( {stock: yes.stock}, { where: { ar: yes.ar, id: yes.id }});

                        }));

                        const confirmed = await Order.update({ status: "confirmed" }, { where: { id: order.id } });

                        const payment = await Payment.create({...req.body, orderId: order.id})

                        const newOrder = await Order.create({ userId: decoded.id });

                        res.status(201).send({ message: "confirmed"});

                    }
                    else res.status(404).send({ message: "error" })

                }
    
            }
            catch (err){ res.status(404).send(err) }

        })()

	});
	
});


//Agregar producto en una orden

app.put('/', (req, res) => {

	let token = req.headers.authorization.split(' ')[1];

    if(token === "null"){

        console.log(req.body)
    } else 

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error } ) :

        (async function (){

            try {

                const order = await Order.findOne({ where: { userId: decoded.id, status: "open" } });

                const stock = await Stock.findOne({ where: { id: req.body.products, ar: req.body.size } });

                if( req.body.quantity > stock.stock ){ res.status(403).send({ message: "Sin Stock" }) };

                const quantity = await Quantity.findOne({where: { order: order.id, products: req.body.products }});

                if(quantity){

                    const quantitysize = await Sizequan.findOne({ where: { ar: req.body.size, id: quantity.id }});

                    if(quantitysize && req.body.quantity <= stock.stock){

                        const updateQuan = await Sizequan.update({ quantity:  req.body.quantity }, { where: { id: quantitysize.id, ar: req.body.size } });
                    
                        res.status(200).send({ message: "update" });
                    }
                    if(!quantitysize && req.body.quantity <= stock.stock ){

                        const SizeQuantity = await Sizequan.create({ id: quantity.id, ar: req.body.size, quantity: req.body.quantity });

                        res.status(200).send(quantity);
                    }

                }
                if(!quantity && req.body.quantity <= stock.stock ){

                    const createQuantity = await Quantity.create({ order: order.id, products: req.body.products });

                    const SizeQuantity = await Sizequan.create({ id: createQuantity.id, ar: req.body.size, quantity: req.body.quantity});

                    res.status(200).send(createQuantity);
                }
    
            }
            catch (err){ res.status(404).send(err) };
            
        })()

	});
	
});


//Quitar un producto de una orden


app.delete('/:products/:size', (req, res) => {

	let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) :

        (async function (){

            try {

                const order = await Order.findOne({ where: { userId: decoded.id, status: "open" } });

                const quantity = await Quantity.findOne({where: { order: order.id, products: req.params.products }});

                const quantitySizeDelete = await Sizequan.destroy({ where: { ar: req.params.size, id: quantity.id }});

                const quantitySize = await Sizequan.findOne({ where: { id: quantity.id }});

                if(!quantitySize){

                    const quantityDelete = await Quantity.destroy({ where: { order: order.id, products: req.params.products } });

                    res.status(200).send({message: "delete"});
                }
                else res.status(200).send({message: "delete"});

            }
            catch (err){ res.status(404).send(err) };
            
        })()

	});
	
});


module.exports = app;