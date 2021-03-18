const app = require('express').Router();
const { Products, Sizes, Images , Stock} = require('../db.js');

// retorno todos los talles

app.get('/', (req, res) => {

    Sizes.findAll(
        {
            include: Products,
            order: [["ar",  "asc" ]]
        }
    )
    
	.then((sizes) => {

        res.send(sizes);
        
	})
	.catch(err => { res.status(404).send(err) });
});

// retorno un talle

app.get('/:ar', (req, res) => {

	Sizes.findOne({

		where: { ar: req.params.ar},
        include:  [ { model: Products, include: [Images] } ]
        
    })

	.then((sizes) => {

        res.send(sizes);
        
    })
    
	.catch(err => { res.status(404).send(err) });
});



// crea un talle

app.post('/', (req, res) => {

    Sizes.create(req.body)
    
    .then((sizes) =>{

        res.status(201).send(sizes);
        
    })
    .catch(err => { res.status(404).send(err) });
});


//asigan un talle a un producto

app.post('/:ar/product/:id/stock/:stock', (req, res) => {
	
    Products.findByPk(req.params.id)
    
    .then((productos) => {

        Sizes.findByPk(req.params.ar)

        .then((talle) => {
            
            productos.addSizes(talle, { through: { stock: req.params.stock } });

            res.status(201).send("success");

        })
        .catch(err => { res.status(404).send(err) });

    })
    .catch(err => { res.status(404).send(err) });
});

//borrar en talle de un articulo

app.delete('/:ar/:id', (req, res) => {

	Stock.destroy(
		
		{
			where: { id: req.params.id, ar: req.params.ar}
		}

	)
	.then(() => {

		res.status(200).send("Delete");

	})
	.catch(err => { res.status(404).send(err) });
});

//borrar un talle

// borrar un producto

app.delete('/:ar', (req, res) => {

	Sizes.destroy(
		
		{
			where: { ar: req.params.ar }
		}

	)
	.then(() => {

		res.status(200).send("Delete");

	})
	.catch(err => { res.status(404).send(err) });
});

app.get('/nada/:id', (req, res) => {

    Sizes.findAll(
        {
            include: Products,
            order: [["ar",  "asc" ]]
        }
    )
    
	.then((sizes) => {

        res.send(sizes);
        
	})
	.catch(err => { res.status(404).send(err) });
});
module.exports = app;