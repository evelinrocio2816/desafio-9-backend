
const mongoose = require("mongoose");
const { mongo_url } = require("../config/config");



 mongoose.connect(mongo_url)
.then(()=> console.log("Conexion Exitosa"))
.catch((error)=>console.log("Error de conexion", error))