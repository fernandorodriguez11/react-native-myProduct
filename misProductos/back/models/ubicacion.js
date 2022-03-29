const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ubicacion = new Schema({
    nombre: {
        type: String
    }
});

module.exports = mongoose.model('Ubicacion', Ubicacion);