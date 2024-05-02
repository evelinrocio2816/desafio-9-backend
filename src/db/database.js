

const mongoose = require("mongoose");
const { mongo_url } = require("../config/config");
const logger = require("../utils/loggers")


class BaseDatos {
    static #instance;
    constructor(){
        mongoose.connect(mongo_url)
    }
    static getInstance(){
        if( this.#instance){
           logger.info("Conexion Previa");
            return this.#instance
        }
        this.#instance = new BaseDatos()
           logger.info("Conexion Exitosa!!");
        return this.#instance
    }
}
 module.exports = BaseDatos.getInstance();

