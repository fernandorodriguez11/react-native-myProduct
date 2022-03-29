const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tipo = new Schema({
    tipo: {
        type: String
    }
});

module.exports = mongoose.model('Tipo', Tipo);  