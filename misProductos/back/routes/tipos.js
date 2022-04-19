const { Router } = require('express');
const Tipo = require('../models/tipoProducto');

const rutas = Router();

/**Función que se encarga de obtener todos los tipos de productos */
rutas.route("/obtener-tipos").get((req, res ) => {

    Tipo.find((error, tipos) => {

        if(error){

        }else{
            if(tipos !== null){
                res.json({
                    valido: true,
                    mensaje: "Aquí tienes todas los tipos de producto",
                    tipos
                });
            }
        }
    })
});

/**Función para insertar el tipo del producto. */
rutas.route("/tipos").post((req,res) => {

    const tipo = req.body.tipo;

    Tipo.findOne({tipo}, (error, tipos) => {
        
        if(tipos !== null){
            
            res.json({
                mensaje: "Este tipo ya existe",
                valido: false
            });

        }else{
            
            let newTipo = new Tipo(req.body);

            let promesaDeGuardado = newTipo.save();

            promesaDeGuardado.then(datos =>{
                console.log(datos);
                res.json({
                    mensaje: "Tipo insertado correctamente",
                    valido: true,
                    ubicacion: tipos
                })
            });
        }

    });

});

/**Obtener el tipo del producto especifico según el id del producto */
rutas.route("/tipo-especifico/:id").get((req, res) => {

    const _id = req.params.id;

    Tipo.findById({_id}, (error, tipoProducto) => {

        if(error){
            console.log("Error a la hora de obtener el tipo de producto");
        }else{
            if(tipoProducto !== null){
                res.json({
                    _id: tipoProducto._id,
                    tipo: tipoProducto.tipo,
                });
            }
        }
    });

});

module.exports = rutas;