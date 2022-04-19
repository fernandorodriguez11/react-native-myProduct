const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/config');

class Server {
    
    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            ubicaciones: '/api/ubicaciones',
            tipos: '/api/tipos'
        }

        this.conectarDB();
        this.middlewares();
        this.routes();
        
    }
    
    async conectarDB() {
        await dbConnection();
    }

    middlewares(){

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){

        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.ubicaciones, require('../routes/ubicaciones'));
        this.app.use(this.paths.tipos, require('../routes/tipos'));

    }
    
    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
    
}

module.exports = Server;