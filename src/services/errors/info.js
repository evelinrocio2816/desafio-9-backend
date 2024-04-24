const generateInfoError = (user) => {
    return ` Los datos estan incompletos o no son válidos. 
    Necesitamos recibir los siguientes datos: 
    - Nombre: String, pero recibimos ${user.nombre}
    - Apellido: String, pero recibimos ${user.apellido}
    - Email: String, recibimos ${user.email}
    `
}

module.exports = {
    generateInfoError
}