const { Router } = require('express');
const Productos = require('../models/productos');
const Ubicacion = require('../models/ubicacion');

const rutas = Router();

/**Función para insertar ubicaciones de la casa nuevas. */
rutas.route("/ubicacion").post((req,res) => {

    const ubicacionNombre = req.body.nombre;

    Ubicacion.findOne({nombre: ubicacionNombre}, (error, ubicaciones) => {
        
        if(ubicaciones !== null){
            
            res.json({
                mensaje: "Esta ubicación ya existe",
                valido: false
            });

        }else{
            
            let newUbicacion = new Ubicacion(req.body);

            let promesaDeGuardado = newUbicacion.save();

            promesaDeGuardado.then(datos =>{
                console.log(datos);
                res.json({
                    mensaje: "Ubicacion insertado correctamente",
                    valido: true,
                    ubicacion: ubicaciones
                })
            });
        }

    });

});

/**Función que se encarga de obtener todoas las ubicaciones de la casa*/
rutas.route("/obtener-ubicaciones").get((req, res ) => {

    Ubicacion.find((error, ubicaciones) => {

        if(error){

        }else{
            if(ubicaciones !== null){
                res.json({
                    valido: true,
                    mensaje: "Aquí tienes todas las ubicaciones de la casa",
                    ubicaciones
                });
            }
        }
    })
});

/**
 * Función encarga en obtener todos los productos que tengan la ubicación pasada por parámetros.
 */
rutas.route("/productosEn/:ubicacion").get( (req, res) => {

    const nombre = req.params.ubicacion;
    let ubicacionId;

    Ubicacion.findOne({nombre}, (error, ubicacion) => {

        if(error){
            res.json({
                mensaje: "Ha habido un error a la hora de buscar una ubicación con este id",
                valido: false,
            });
        }else{
            if(ubicacion !== null){
                
                ubicacionId = ubicacion._id;

                Productos.find({ubicacionId}, (error, productos) => {
                    if(error){
                        res.json({
                            mensaje: "Ha habido un error a la hora de buscar los productos",
                            valido: false,
                        });
                    }else{
                        if(productos !== null){
                            res.json({
                                mensaje: 'Estos son los productos',
                                valido: true,
                                productos
                            });
                        }
                    }
                });
            }
        }
    });

});

module.exports = rutas;