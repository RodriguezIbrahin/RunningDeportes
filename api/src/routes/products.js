const app = require('express').Router();
const { Products, Sizes, Images, Stock} = require('../db.js');



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
	
	Products.findOne(

		{
		   where: { id: req.params.id} ,
		   include: [Sizes, Images]
		}
		
	)
	.then((products) => {

		res.status(200).send(products);

	})
	.catch(err => { res.status(404).send(err) });
});



// crea un producto

app.post('/', (req, res) => {

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



//Actualizar un producto 

app.put('/:id', (req, res) => {

	Products.update(req.body,

		{
			where: { id: req.params.id }
		}
	)
	.then((products) => {

		res.status(200).send(products);

	})
	.catch(err => { res.status(404).send(err) });
})



// borrar un producto

app.delete('/:id', (req, res) => {

	Products.destroy(
		
		{
			where: { id: req.params.id }
		}

	)
	.then(() => {

		res.status(200).send("Delete");

	})
	.catch(err => { res.status(404).send(err) });
});


module.exports = app;