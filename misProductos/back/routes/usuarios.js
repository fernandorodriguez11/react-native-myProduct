const { Router } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios');

const rutas = Router();

/**
 * Cada vez que iniciamos la aplicación comrpobamos si existe un usuario con ese token
 * TODO cambiarlo a get.
 */
 rutas.route("/existe-token").post((req, res) => {

    const token = req.body.token;

    Usuario.findOne({token}, (error, user) => {

        if(error){
            res.json({
                status: res.status(400),
                mensaje: "error",
                valido: false,
                error: error
            });
        } else {
           
            if(user === null){
                
                res.json({
                    mensaje: "incorrecto",
                    valido: false,
                    usuario: null,
                    token: null,
                });

            }else{
                console.log('usuario correcto');
                res.json({
                    mensaje: "Usuario correcto",
                    valido: true,
                    usuario: user,
                    token: user.token,
                });

                
            }
        }

    });

});

/**
 * Función encargada de iniciar sesión si el usuario introduce su email y password correctamente.
 */
 rutas.route("/login").post((req, res) => {

    console.log(req.body.email);
    console.log(req.body.password);

    Usuario.findOne({email: req.body.email}, (error, user) => {

        if(error){
            res.json({
                status: res.status(400),
                mensaje: "error",
                valido: false,
                usuario: null,
                error: error
            });
        } else {
           
            if(user === null){
                
                res.json({
                    mensaje: "incorrecto",
                    valido: false,
                    usuario: null,
                    token: null,
                });

            }else{
                bcrypt.compare(req.body.password, user.password).then((samePassword) => {

                    if(!samePassword){
                        res.json({
                            valido: false,
                            usuario: null,
                            mensaje: 'password incorrecta'
                        })
                    }else{
                        res.json({
                            mensaje: "Usuario correcto",
                            valido: true,
                            usuario: user,
                            token: user.token,
                        });
                    }
                });
                
            }
        }

    });

});

/**
 * Función encargada en crear un usuario siempre y cuando no exista un usuario con ese email.
 */
 const costeProcesado = 11;
 rutas.route("/insertar").post((req,res) => {
 
     const email = req.body.email;
     let password = '';
 
     Usuario.findOne({email}, (error, usuario) => {
         
         if(usuario !== null){
             
             res.json({
                 mensaje: "Este usuario con este email ya existe",
                 valido: false
             });
 
         }else{
             
             password = bcrypt.hash(req.body.password, costeProcesado).then((hashPassword) => {
                 console.log(hashPassword);
 
                 let newUsuario = new Usuario({
                     ...req.body,
                     password: hashPassword
                 })
 
                 return newUsuario.save();
             }).then(() =>{
                 res.json({
                     mensaje: "Usuario insertado correctamente",
                     valido: true,
                     usuario: usuario
                 });
             });
             
         }
 
     });
 
 });

 rutas.route("/todosUsu").get((req, res) => {

    Usuario.find((error, user) => {

        if(error){
            res.json({
                status: res.status(400),
                mensaje: "error",
                valido: false,
                error: error
            });
        } else {
           
            if(user === null){
                
                res.json({
                    mensaje: "incorrecto",
                    valido: false,
                    usuario: null,
                    token: null,
                });

            }else{
                
                res.json({
                    mensaje: "Usuarios",
                    valido: true,
                    usuario: user,
                    token: user.token,
                });

                
            }
        }

    });

});


module.exports = rutas;