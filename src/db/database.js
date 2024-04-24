
const mongoose = require("mongoose");
const { node_env } = require("../config/config");



 mongoose.connect(node_env)
.then(()=> console.log("Conexion Exitosa"))
.catch((error)=>console.log("Error de conexion", error))