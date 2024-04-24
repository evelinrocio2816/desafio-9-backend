const ProductRepository = require("../repositorys/product.repository");
const productRepository = new ProductRepository();

class ProductController {

    async addProduct(req, res) {
        const newProduct = req.body;
        try {
            console.log("Añadiendo un nuevo producto:", newProduct);
            const result = await productRepository.addProduct(newProduct);
            console.log("Producto agregado exitosamente:", result);
            res.status(201).json(result); 
        } catch (error) {
            console.error("Error al agregar un nuevo producto:", error);
            res.status(500).json({ error: "Error interno del servidor al agregar un nuevo producto" }); 
        }
    }

    async getProducts(req, res) {
        try {
            let { limit = 10, page = 1, sort, query } = req.query;
            console.log("Obteniendo productos con parámetros:", { limit, page, sort, query });
            const products = await productRepository.getProducts(limit, page, sort, query);
            console.log("Productos obtenidos exitosamente:", products);
            res.json(products);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            res.status(500).json({ error: "Error interno del servidor al obtener los productos" });
        }
    }

    async getProductsById(req, res) {
        const id = req.params.pid;
        try {
            console.log("Obteniendo producto por ID:", id);
            const sought = await productRepository.getProductsById(id);
            if (!sought) {
                console.log("Producto no encontrado con ID:", id);
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            console.log("Producto encontrado:", sought);
            res.json(sought);
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error);
            res.status(500).json({ error: "Error interno del servidor al obtener el producto por ID" }); 
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.pid;
            const updatedProduct = req.body;

            console.log("Actualizando producto con ID:", id);
            const result = await productRepository.updateProduct(id, updatedProduct);
            console.log("Producto actualizado exitosamente:", result);
            res.json(result);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            res.status(500).json({ error: "Error interno del servidor al actualizar el producto" }); 
        }
    }

    async deleteProduct(req, res) {
        const id = req.params.pid;
        try {
            console.log("Eliminando producto con ID:", id);
            let answer = await productRepository.deleteProduct(id);
            console.log("Producto eliminado exitosamente:", answer);
            res.json(answer);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            res.status(500).json({ error: "Error interno del servidor al eliminar el producto" }); 
        }
    }

    async mockingProducts(req, res){
        const products = [];
        for(let i = 0 ; i <100; i ++ ){
            products.push(generateProducts())
        }
        console.log("Productos de simulación generados:", products);
        res.json(products);
    }
}

module.exports = ProductController;
