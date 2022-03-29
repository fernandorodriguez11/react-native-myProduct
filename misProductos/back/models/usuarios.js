const Db = require('mongodb/lib/db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Usuario = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    rol: {
        type: String,
        enum: ["ROLE_USER", "ROLE_ADMIN"],
        default: "ROLE_USER"
    },
    token: {
        type: String
    },
    username: {
        type: String
    },
});

module.exports = mongoose.model('Usuario', Usuario);