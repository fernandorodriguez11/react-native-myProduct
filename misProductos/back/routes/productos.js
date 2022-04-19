const { Router } = require('express');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const Productos = require('../models/productos');
const Cesta = require('../models/cesta');

const rutas = Router();

/** 
 *  Función que recibe un objeto con los datos del nuevo producto. 
 *  Comprobamos si existe algun producto con ese nombre, si existiera no lo creamos, si no existe creamos
 *  el producto.
 */
 rutas.route("/insertar-productos").post((req, res) => {
    
    const productoI = {
        nombre: req.body.nombre,
        tienda: req.body.tienda,
        ubicacionId: req.body.ubicacionId,
        tipoId: req.body.tipoId
    }

    const nombre = req.body.nombre;

    Productos.findOne({nombre}, (error, producto) => {

        if(error){
            console.log("error");
            res.json({
                mensaje: 'Error a la hora de insertar un producto',
                valido: false
            });
        } else {

            if(producto !== null){
                console.log("errorasasdf");
                res.json({
                    mensaje: "Este producto ya existe en el almacén",
                    valido: false,
                })
            }else{
                
                let nuevoProducto = new Productos(productoI);
 
                let promesaGuardado = nuevoProducto.save();

                promesaGuardado.then(products => {
                    res.json({
                        mensaje: "Producto insertado correctamente!!",
                        valido: true,
                        producto: products
                    });

                    console.log(products);
                });
            }
        }

    });
     
});

rutas.route("/subirImagen/:id").put(async(req, res) => {

    const {id: _id} = req.params;
    const {archivo} = req.files;
    
    try {

         const {secure_url}  = await cloudinary.uploader.upload( archivo.tempFilePath, 
            {api_key: process.env.API_KEY,
            public_id: `${Date.now()}`,
            api_secret: process.env.API_SECRET,
            cloud_name: process.env.CLOUD_NAME});

            Productos.findById({_id}, (error, producto) => {
                if(error){
                    res.json({
                        mensaje: 'Error a la hora de buscar usuario'
                    });
                }
        
                if(producto !== null){

                    producto.imagen = secure_url;
                    producto.save();

                    res.json({
                        mensaje: 'Imagen añadida correctamente',
                        archivo,
                        valido: true,
                        producto
                    });
        
                }
            });

    }catch(error){
        console.log(error);
    }

});

rutas.route("/pedidos").get((req, res) => {

    Cesta.find((error, pedidos) => {

        if(error){
            res.json({
                mensaje: 'Error a la hora de buscar los pedidos',
            })
        }else{
            if(pedidos !== null){
                res.json({
                    cesta: pedidos,
                    mensaje: "Estos son los pedidos",
                });
            }else{
                res.json({
                    mensaje: "No hay pedidos todavía",
                    cesta: null,
                })
            }
        }

    });
});

rutas.route("/addTo-cesta").post((req, res) => {

    const productoId = req.body.productoId;

    Cesta.findOne({productoId}, (error, pedido) => {

        if(error){
            console.log('error a la hora de insertar un pedido en la cesta');
            res.json({
                mensaje: "No se ha podido insertar el pedido",
                valido: false,
                cesta: null,
            });
        }else{

            if(pedido === null){

                let newPedido = new Cesta(req.body);

                let promesaDeGuardado = newPedido.save();

                promesaDeGuardado.then(pedido => {
                    res.json({
                        mensaje: "Pedido insertado correctamente!!",
                        valido: true,
                        cesta: pedido,
                    });
                });
            } else {
                
                res.json({
                    valido: true,
                    mensaje: 'El pedido ya está en la cesta'
                })
            }
        }
    });
});

rutas.route("/productoById/:id").get((req, res) => {

    const _id = req.params.id;

    Productos.findById({_id}, (error, productos) => {

        if(error){
            console.log("Ha habido un error");
        }else{
            if(productos !== null){
                console.log(productos);
                res.json({
                    productos
                })
            }
        }

    });

});

rutas.route("/todos").get((req, res) => {


    Productos.find((error, productos) => {

        if(error){
            console.log("Ha habido un error");
        }else{
            if(productos !== null){
                console.log(productos);
                res.json({
                    productos
                })
            }
        }

    });

});

rutas.route("/comprar").put((req, res) => {

    const _id = req.body._id;
    console.log(_id);
    Cesta.findById({_id}, (error, cesta) => {

        if(error){
            res.json({
                mensaje: "Ha habido un error a la hora de comprar el producto"
            });
        }else {
            if(cesta !== null){
                
                for (const prop in req.body) {
                    cesta[prop] = req.body[prop]
                }
        
                console.log(cesta);

                cesta.save();

                res.json({
                    valido: true,
                    mensaje: "Producto comprado",
                    cesta
                })
            }
        }
    });
});

/**
 * Función encargada de buscar la collección en la base de datos, si encuentra una con el id pasado por parámetros, se elimina.
 */
rutas.route("/eliminar-de-la-cesta/:id").delete((req, res) => {

    const _id = req.params.id;

    Cesta.findByIdAndDelete({_id}, (error, pedidoEle) => {

        if(error){
            res.json({
                mensaje: 'Error al eliminar un producto de la cesta',
                valido: false,
            });
        }else {
            if(pedidoEle !== null){
                console.log(pedidoEle);
                res.json({
                    mensaje: 'Eliminado exitosamente',
                    valido: true,
                })
            }
        }

    });

});

rutas.route("/eliminar-todos").delete((req, res) => {

    Productos.deleteMany({}, (error, resp) => {
        res.json({
            respuesta: resp
        });
    })

});

module.exports = rutas;