const ProductModel = require("../models/products.models.js");
const CartRepository = require("../repositorys/cart.repository.js");
const cartRepository = new CartRepository();

class ViewsController {
    async renderProducts(req, res) {
        try {
            const { page = 1, limit = 3 } = req.query;

            const skip = (page - 1) * limit;

            const products = await ProductModel
                .find()
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments();

            const totalPages = Math.ceil(totalProducts / limit);

            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            const newArray = products.map(product => {
                const { _id, ...rest } = product.toObject();
                return { id: _id, ...rest }; // Agregar el ID al objeto
            });

            console.log("Productos renderizados:", newArray);

            const cartId = req.user.cart.toString();
            console.log("ID de carrito:", cartId);

            res.render("products", {
                products: newArray,
                hasPrevPage,
                hasNextPage,
                prevPage: page > 1 ? parseInt(page) - 1 : null,
                nextPage: page < totalPages ? parseInt(page) + 1 : null,
                currentPage: parseInt(page),
                totalPages,
                cartId
            });

        } catch (error) {
            console.error("Error al obtener productos", error);
            res.status(500).json({
                status: 'error',
                error: "Error interno del servidor"
            });
        }
    }

    async renderCart(req, res) {
        const cartId = req.params.cid;
        try {
            const cart = await cartRepository.getProductsFromCart(cartId);

            console.log("Carrito obtenido:", cart);

            if (!cart) {
                console.log("No existe el carrito con ese id");
                return res.status(404).json({ error: "carrito no encontrado" });
            }

            let totalPurchase = 0;

            const productsInCart = cart.products.map(item => {
                const product = item.product.toObject();
                const quantity = item.quantity;
                const totalPrice = product.price * quantity;

                totalPurchase += totalPrice;

                return {
                    product: { ...product, totalPrice },
                    quantity,
                    cartId
                };
            });

            console.log("Productos en el carrito:", productsInCart);

            res.render("carts", { products: productsInCart, totalPurchase, cartId });
        } catch (error) {
            console.error("Error al obtener el carrito", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async renderLogin(req, res) {
        console.log("Renderizando página de inicio de sesión");
        res.render("login");
    }

    async renderRegister(req, res) {
        console.log("Renderizando página de registro");
        res.render("register");
    }

    async renderRealTimeProducts(req, res) {
        try {
            console.log("Renderizando vista de productos en tiempo real");
            res.render("realtimeproducts");
        } catch (error) {
            console.log("Error en la vista real time", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async renderChat(req, res) {
        const cartId=  req.user.cart.toString();
        console.log("Renderizando página de chat con ID de carrito:", cartId);
        res.render("chat",{cartId});
    }

    async renderHome(req, res) {
        console.log("Renderizando página de inicio");
        res.render("home");
    }
}

module.exports = ViewsController;
