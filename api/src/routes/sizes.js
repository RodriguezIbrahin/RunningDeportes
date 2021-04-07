const app = require('express').Router();
const { Products, Sizes, Images , Stock} = require('../db.js');
const authConfig = require('../auth');
const jwt = require("jsonwebtoken");

// retorno todos los talles

app.get('/', (req, res) => {

    (async function (){
        
        try {
            const size = await Sizes.findAll( { include: Products, order: [['ar', 'ASC']] } )

            res.status(201).send(size);
        }
        catch (err){ res.status(404).send(err) }

    })()

});

// retorno un talle

app.get('/:ar', (req, res) => {

    (async function (){
        
        try {
            const sizes = await Sizes.findOne({ where: { ar: req.params.ar}, include:  [ { model: Products, include: [Images] } ] });

            const stockInSize = sizes.products.filter(sizes => sizes.stock.stock > 0);

            res.status(201).send({ar: req.params.ar, products: stockInSize});
        }
        catch (err){ res.status(404).send(err) }

    })()

});



// crea un talle

app.post('/', (req, res) => {

    let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) : decoded.rol !== "admin" ? res.status(403).send( { message: "no tiene permisos"} ) :

		(async function (){

			try {
	
				const create= await Sizes.create(req.body)

				res.status(201).send(create);
	
			}
			catch (err){
	
				res.status(404).send(err)	
	
			}
		})()

	});

});


//asigan un talle a un producto

app.post('/:ar/product/:id/stock/:stock', (req, res) => {

    let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) : decoded.rol !== "admin" ? res.status(403).send( { message: "no tiene permisos"} ) :

		(async function (){

			try {
	
				const products= await Products.findByPk(req.params.id);

                const size = await Sizes.findByPk(req.params.ar);

                const stoc = await products.addSizes(size, { through: { stock: req.params.stock } });


				res.status(201).send("success");
	
			}
			catch (err){
	
				res.status(404).send(err)	
	
			}
		})()

	});

});

//borrar en talle de un articulo

app.delete('/:ar/:id', (req, res) => {

    let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) : decoded.rol !== "admin" ? res.status(403).send( { message: "no tiene permisos"} ) :

		(async function (){

			try {
	
                const stock = await Stock.destroy( { where: { id: req.params.id, ar: req.params.ar} } )

				res.status(201).send("Delete");
	
			}
			catch (err){
	
				res.status(404).send(err)	
	
			}
		})()

	});

});

//borrar un talle

app.delete('/:ar', (req, res) => {

    let token = req.headers.authorization.split(' ')[1];

	jwt.verify( token, authConfig.secret, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) : decoded.rol !== "admin" ? res.status(403).send( { message: "no tiene permisos"} ) :

		(async function (){

			try {
	
                const size = await Sizes.destroy( { where: { ar: req.params.ar } } )

				res.status(201).send("Delete");
	
			}
			catch (err){
	
				res.status(404).send(err)	
	
			}
		})()

	});

});

module.exports = app;