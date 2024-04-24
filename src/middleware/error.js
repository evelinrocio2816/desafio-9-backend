const { EErrors } = require("../services/errors/enums.js");

const handleErrors = (error, req, res, next) => {
    console.log(error.causa);
    console.log("Hola");
    switch (error.code) {
        case EErrors.TIPO_INVALID:
            res.send({ status: "error", error: error.nombre })
            break;
        default:
            res.send({ status: "error", error: "Error desconocido" })
    }
}

module.exports = handleErrors;