const CartModel = require("../models/cart.models.js");

class CartRepository {
  async createCart() {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      console.error("Error al crear carrito:", error);
    }
  }

  async getProductsFromCart(idCart) {
    try {
      const cart = await CartModel.findById(idCart);
      if (!cart) {
        console.log("No existe un carrito con ese");
        return null;
      }
      return cart;
    } catch (error) {
      console.error("Error al obtener productos del carrito:", error);
    }
  }

  async addProduct(cartId, productId, quantity = 1) {
    try {
      const cart = await this.getProductsFromCart(cartId);
      const productExist = cart.products.find(
        (item) => item.product._id.toString() === productId
      );

      if (productExist) {
        productExist.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      //antes de guardar modifico la propiedad products:
      cart.markModified("products");

      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error al añadir producto al carrito:", error);
    }
  }

  async removeProduct(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        console.log("No se encontró el carrito");
        return null;
      }
      cart.products = cart.products.filter(
        (item) => item.product._id.toString() !== productId
      );
      await cart.save();
      return cart;
    } catch (error) {
      console.log("Error al eliminar producto del carrito:", error);
      return null;
    }
  }

  async updateProductsInCart(cartId, updatedProducts) {
    try {
      const cart = await CartModel.findById(cartId);

      if (!cart) {
        console.log("No se encontró el carrito");
        return null;
      }

      cart.products = updatedProducts;

      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      console.log("Error al actualizar productos del carrito:", error);
      return null;
    }
  }

  async updateQuantityInCart(cartId, productId, newQuantity) {
    try {
      const cart = await CartModel.findById(cartId);

      if (!cart) {
        console.log("No se encontró el carrito");
        return null;
      }

      const productIndex = cart.products.findIndex(
        (item) => item._id.toString() === productId
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity = newQuantity;

        cart.markModified("products");

        await cart.save();
        return cart;
      } else {
        console.log("Producto no encontrado en el carrito");
        return null;
      }
    } catch (error) {
      console.log("Error al actualizar cantidad en el carrito:", error);
      return null;
    }
  }

  async emptyCart(cartId) {
    try {
      const cart = await CartModel.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
      );

      if (!cart) {
        console.log("No se encontró el carrito");
        return null;
      }

      return cart;
    } catch (error) {
      console.log("Error al vaciar el carrito:", error);
      return null;
    }
  }
}

module.exports = CartRepository;
