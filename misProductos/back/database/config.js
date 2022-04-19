const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log("Conexión exitosa a la base de datos de MY PRODUCTS");

    }catch(error){
        console.log(error);
        throw new Error("Error a la hora de conectarnos a la base de datos");
    }
}

module.exports = {
    dbConnection
}