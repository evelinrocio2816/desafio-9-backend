const UserModel = require("../models/user.models.js");
const CartModel = require("../models/cart.models.js");
const jwt = require("jsonwebtoken");
const { createHash, isValidPassword } = require("../utils/hashBcryp.js");
const UserDTO = require("../dto/user.dto.js");
const CustomErrors = require("../services/errors/custom-error.js");
const { EErrors } = require("../services/errors/enums.js");
const { generateInfoError } = require("../services/errors/info.js");
const logger =require("../utils/loggers.js") 

class UserController {
  async register(req, res) {
    const { first_name, last_name, email, password, age } = req.body;
    try {
      const existUser = await UserModel.findOne({ email });
      if (existUser) {
        throw CustomErrors.createError({
          email: "Usuario nuevo",
          causa: generateInfoError(existUser.email),
          mensaje: "Error al intentar crear un usuario",
          codigo: EErrors.TIPO_INVALID,
        });
      }


      //Creo un nuevo carrito:
      const newCart = new CartModel();
      logger.info("Nuevo carrito creado:", newCart);
      await newCart.save();

      const newUser = new UserModel({
        first_name,
        last_name,
        email,
        cart: newCart._id,
        password: createHash(password),
        age,
      });

      logger.info("Nuevo usuario creado:", newUser);
      await newUser.save();

      const token = jwt.sign({ user: newUser }, "coderhouse", {
        expiresIn: "1h",
      });

      logger.info("Token generado:", token);
      res.cookie("CookieToken", token, {
        maxAge: 3600000,
        httpOnly: true,
      });

      res.redirect("/api/user/profile");
    } catch (error) {
      logger.error("Error en el registro de usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const userFound = await UserModel.findOne({ email });

      logger.info("Usuario encontrado en el inicio de sesión:", userFound);

      if (!userFound) {
        return res.status(401).send("Usuario no válido");
      }

      const isValid = isValidPassword(password, userFound);
      logger.info("La contraseña es válida:", isValid);

      if (!isValid) {
        return res.status(401).send("Contraseña incorrecta");
      }

      const token = jwt.sign({ user: userFound }, "coderhouse", {
        expiresIn: "1h",
      });

      logger.info("Token generado:", token);
      res.cookie("CookieToken", token, {
        maxAge: 3600000,
        httpOnly: true,
      });

      res.redirect("/api/user/profile");
    } catch (error) {
      logger.error("Error en el inicio de sesión:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async profile(req, res) {
    //Con DTO:
    const userDto = new UserDTO(
      req.user.first_name,
      req.user.last_name,
      req.user.role
    );
    logger.info("Usuario obtenido en el perfil:", userDto);
    const isAdmin = req.user.role === "admin";
    const cartId = req.user.cart.toString();
    res.render("profile", { user: userDto, isAdmin, cartId });
  }

  async logout(req, res) {
    res.clearCookie("CookieToken");
    logger.info("Usuario desconectado.");
    res.redirect("/login");
  }

  async admin(req, res) {
    if (req.user.user.role !== "admin") {
      return res.status(403).send("Acceso denegado");
    }
    logger.info("Acceso de administrador.");
    res.render("admin");
  }
}
module.exports = UserController;
