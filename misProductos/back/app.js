require('dotenv').config();
const Server = require('./servidor/server');

const server = new Server();

server.listen();