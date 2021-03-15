const jwt = require("jsonwebtoken");
const authConfig = require('../auth');


module.exports = function(req, res, next){

    if(req.method == "POST" && req.path == "/users/singin" ||  req.path == "/users" ){
        
        return next();

    }if( req.method != "GET" && req.path != "/users/singin" && req.path != "/users" ){

        if(req.headers.authorization){

            let token = req.headers.authorization.split(' ')[1];

            jwt.verify( token, authConfig.secret, function ( error, decoded ){

                error ? res.status(403).send( { message: 'No Tienes Permisos..'} ) : decoded.rol == 'user' ? res.status(403).send( { message: 'No Tienes Permisos..'} ) : next();
            });

        } else { res.status(403).send( { message: 'No Tienes Permisos..'} );}

    }
    else next()
}