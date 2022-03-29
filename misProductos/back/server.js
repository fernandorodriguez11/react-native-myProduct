const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: '.env'});
const app = express();
const PORT = process.env.PORT;
     
/**Schemas de la base de datos */
const Usuario = require('./models/usuarios');
const Cesta = require('./models/cesta');
const Productos = require('./models/productos');
const Tipo = require('./models/tipoProducto');
const Ubicacion = require('./models/ubicacion');

app.use(bodyParser.json());
app.use(cors());

//Conexión a la base de datos creada en mongo Atlas
mongoose.connect(process.env.MONGODB_CNN);

//Variable con la que conectaremos a la base de datos de mongoo
const conexion = mongoose.connection;

//Realizamos la conexion a la base de datos y si se conecta exitosamente se muestra un mensaje.
conexion.once("open", function () {
  console.log(" 0) - Conectado a la base de datos de Mis Productos");
})

//Función que nos muestra el puerto al que estamos conectados.
app.listen(PORT, function () {

  console.log("servidor ejecutandose en " + PORT);

});

const rutasAPI = express.Router();

//Va a ser nuestro intermediario en la URL.
app.use("/api/productos", rutasAPI);

/** ----------- Constulas Usuario------------- */

/**
 * Función encargada en crear un usuario siempre y cuando no exista un usuario con ese email.
 */
const costeProcesado = 11;
rutasAPI.route("/insertar").post((req,res) => {

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

/**
 * Cada vez que iniciamos la aplicación comrpobamos si existe un usuario con ese token
 * TODO cambiarlo a get.
 */
 rutasAPI.route("/existe-token").post((req, res) => {

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
rutasAPI.route("/login").post((req, res) => {

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
 *  Función que recibe un objeto con los datos del nuevo producto. 
 *  Comprobamos si existe algun producto con ese nombre, si existiera no lo creamos, si no existe creamos
 *  el producto.
 */
rutasAPI.route("/insertar-productos").post((req, res) => {

    console.log(req.body);
    const nombre = req.body.nombre;

    Productos.findOne({nombre}, (error, producto) => {

        if(error){
            res.json({
                mensaje: 'Error a la hora de insertar un producto',
                valido: false
            });
        } else {

            if(producto !== null){
                res.json({
                    mensaje: "Este producto ya existe en el almacén",
                    valido: false,
                })
            }else{
                let nuevoProducto = new Productos(req.body);

                let promesaGuardado = nuevoProducto.save();

                promesaGuardado.then(products => {
                    res.json({
                        mensaje: "Producto insertado correctamente!!",
                        valido: true,
                        producto: products
                    });
                });
            }
        }

    });
    
});

/**Función para insertar ubicaciones de la casa nuevas. */
rutasAPI.route("/ubicacion").post((req,res) => {

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
rutasAPI.route("/obtener-ubicaciones").get((req, res ) => {

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

/**Función que se encarga de obtener todos los tipos de productos */
rutasAPI.route("/obtener-tipos").get((req, res ) => {

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
rutasAPI.route("/tipos").post((req,res) => {

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

/**
 * Función encarga en obtener todos los productos que tengan la ubicación pasada por parámetros.
 */
rutasAPI.route("/productosEn/:ubicacion").get( (req, res) => {

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
                                ubicacion: ubicacion.nombre,
                                productos
                            })
                        }
                    }
                });
            }
        }
    });

});

/**Obtener el tipo del producto especifico según el id del producto */
rutasAPI.route("/tipo-especifico/:id").get((req, res) => {

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


rutasAPI.route("/addTo-cesta").post((req, res) => {

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

rutasAPI.route("/pedidos").get((req, res) => {

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

rutasAPI.route("/productoById/:id").get((req, res) => {

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

rutasAPI.route("/todos").get((req, res) => {


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

rutasAPI.route("/comprar").put((req, res) => {

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
rutasAPI.route("/eliminar-de-la-cesta/:id").delete((req, res) => {

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

/*
rutasAPI.route("/todosProductos").get((req, res) => {

    Productos.find((error, productos) => {

        if(error){
            res.json({
                mensaje: 'Error',
                valido: false,
            });
        }else {
            if(productos !== null){
                res.json({
                    productos,
                    valido: true,
                });
            }
        }
    });

});

rutasAPI.route("/cambio").put((req, res) => {
    console.log(req.body.email);
    console.log(req.body.token);
    Usuario.findOne({email: req.body.email}, (error, usu)=>{
        console.log(usu);
        for (const prop in req.body) {
            usu[prop] = req.body[prop]
        }
        console.log(usu);

        usu.save();
        
        res.json({
            mensaje: "Cambiado",
            usuario: usu.token
        })
    })
})
*/
rutasAPI.route("/todosUsu").get((req, res) => {

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

