const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Productos = new Schema({
    imagen: {
        type: String
    },
    nombre: {
        type: String
    },
    tienda: {
        type: String,
    },
    tipoId: {
        type: mongoose.ObjectId 
    },
    ubicacionId: {
        type: mongoose.ObjectId
    }
});

module.exports = mongoose.model('Productos', Productos);