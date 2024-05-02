const generateInfoError = (email) => {
    return ` Ya existe un usuario con el email ${email}, por favor ingrese otro correo electrónico`
}

module.exports = {
    generateInfoError
}