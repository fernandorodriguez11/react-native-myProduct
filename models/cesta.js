const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cesta = new Schema({
    cantidad: {
        type: Number
    },
    comprado: {
        type: Boolean
    },
    usuario: {
        type: String
    },
    productoId: {
        type: mongoose.ObjectId
    }
});

module.exports = mongoose.model('Cesta', Cesta);  