const app = require('express').Router();
const { User, Order } = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../auth');
const nodemailer = require('nodemailer');

//Crear un usuario

app.post('/', (req, res) => {


    if (!req.body.password || !req.body.email || !req.body.name || !req.body.last_name){
       return res.status(404).send({menssage: "error"})

    }else bcrypt.hash( req.body.password, authConfig.rounds, function( err ,  hash )  { 

        (async function (){

            try {
    
                const user = await User.create({

                   name: req.body.name,
                   last_name: req.body.last_name,
                   email: req.body.email,
                   rol: req.body.rol,
                  password: hash,
            
                });

                const order = await Order.create({ userId: user.id });

                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'noreply.runningdeportes@gmail.com',
                        pass: 'runningdeportes'
                    }
                });

                const mailOptions = {
                    from: "noreply.runningdeportes@gmail.com",
                    to: req.body.email,
                    subject: "Email confirmation - RunningDeportes",
                    html: `Bienvenido a Running Deportes! Esperamos disfrutes de nuestros productos. <br />`,
                };

                const send = await transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("Email enviado");
                    }
                });

                res.status(200).send(user);
    
            }
            catch (err){ res.status(404).send(err) }

        })()

    });


});

//login

app.post('/singin', (req, res) => {

    User.findOne({

        where: { email: req.body.email },
    })

    .then((acc) => {

        if(!acc){ res.status(404).send({menssage: "Usuario no existente"}) }

        else bcrypt.compare( req.body.password ,acc.password ,  function ( err ,  result )  { 
            
            if(result){

                let payload = { id: acc.id, name: acc.name, last_name: acc.last_name, rol: acc.rol}

                jwt.sign( payload,  authConfig.secret, function( error, token ){

                    if(error) { res.status(500).send( { error } );}

                    else{ res.status(200).send( { rol: acc.rol, token , fullname: acc.name + " " + acc.last_name} );}

                })
            }
            else res.status(404).send({menssage: "Contraseña incorrecta"})
        }); 
    
    })

    .catch(err => { res.status(404).send(err) });

});



module.exports = app;