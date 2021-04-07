const app = require('express').Router();
const { Products, Sizes, Images, Stock} = require('../db.js');
const authConfig = require('../auth');
const jwt = require("jsonwebtoken");




// retorno todos los productos

app.get('/', (req, res) => {
 
	
	Products.findAll({include: [Sizes, Images]})

	.then((products) => {

		res.status(200).send(products);

	})
	.catch(err => { res.status(404).send(err) });
});



// retorno un producto segun id

app.get('/:id', (req, res) => {

	(async function (){

		try {

			const product = await Products.findOne({ where: { id: req.params.id}, include: [Sizes, Images], order: [[Sizes, 'ar', 'ASC' ]] });

			const sizes = product.sizes.filter(sizes => sizes.stock.stock > 0);

			let products = { 

				id: product.id, 
				name: product.name, 
				price: product.price, 
				pricelister: product.pricelister, 
				description: product.description, 
				marca: product.marca, 
				sizes: sizes, 
				images: product.images 
			}
			
			res.status(200).send(products);

		}
		catch (err){

			res.status(404).send(err)	

		}
	})()

});



// crea un producto

app.post('/', (req, res) => {

	let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) : decoded.rol !== "admin" ? res.status(403).send( { message: "no tiene permisos"} ) :

		(async function (){

			try {
	
				const crea = await Products.create(req.body);
	
				req.body.images.forEach(element => Images.create({productId: crea.dataValues.id, img: element}));
	
				req.body.sizes.forEach(element => Stock.create({id: crea.dataValues.id, ar: element[0], stock: element[1]}));
	
				res.status(201).send(crea);
	
			}
			catch (err){
	
				res.status(404).send(err)	
	
			}
		})()

	});

});



//Actualizar un producto 

app.put('/:id', (req, res) => {

	
	let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) : decoded.rol !== "admin" ? res.status(403).send( { message: "no tiene permisos"} ) :

		(async function (){

			try {
	
				const update = await Products.update( req.body,{ where: { id: req.params.id }} )

				res.status(201).send(update);
	
			}
			catch (err){
	
				res.status(404).send(err)	
	
			}
		})()

	});
})



// borrar un producto

app.delete('/:id', (req, res) => {

	let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) : decoded.rol !== "admin" ? res.status(403).send( { message: "no tiene permisos"} ) :

		(async function (){

			try {
	
				const update = await Products.destroy( { where: { id: req.params.id } })

				res.status(201).send("Delete");
	
			}
			catch (err){
	
				res.status(404).send(err)	
	
			}
		})()

	});

});


module.exports = app;