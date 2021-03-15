const app = require('express').Router();
const { User } = require('../db.js');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');


app.post('/', (req, res) => {


    if (!req.body.password || !req.body.email || !req.body.username){
       return res.status(404).send({menssage: "error"})

    }else bcrypt.hash( req.body.password, authConfig.rounds, function( err ,  hash )  { 

        User.create({

            username: req.body.username,
            email: req.body.email,
            rol: req.body.rol,
            password: hash,
        
        })

        .then((acc) => { res.status(200).send(acc) })

        .catch(err => { res.status(404).send(err) });

    });


});



app.post('/singin', (req, res) => {

    User.findOne({

        where: {

            [Op.or]: [
                { email: req.body.username},
                { username: req.body.username},
            ],

        },

    })

    .then((acc) => {

        if(!acc){ res.status(404).send({menssage: "Usuario no existente"}) }

        else bcrypt.compare( req.body.password ,acc.password ,  function ( err ,  result )  { 
            
            if(result){

                let payload = { username: acc.username, rol: acc.rol}

                jwt.sign( payload,  authConfig.secret, function( error, token ){

                    if(error) { res.status(500).send( { error } );}

                    else{ res.status(200).send( { rol: acc.rol, token } );}

                })
            }
            else res.status(404).send({menssage: "Contraseña incorrecta"})
        }); 
    
    })

    .catch(err => { res.status(404).send(err) });

});



module.exports = app;