const ProductRepository = require("../repositorys/product.repository");
const productRepository = new ProductRepository();
const logger =require("../utils/loggers.js") 
class ProductController {

    async addProduct(req, res) {
        const newProduct = req.body;
        try {
           logger.info("Añadiendo un nuevo producto:", newProduct);
            const result = await productRepository.addProduct(newProduct);
           logger.info("Producto agregado exitosamente:", result);
            res.status(201).json(result); 
        } catch (error) {
           logger.error("Error al agregar un nuevo producto:", error);
            res.status(500).json({ error: "Error interno del servidor al agregar un nuevo producto" }); 
        }
    }

    async getProducts(req, res) {
        try {
            let { limit = 10, page = 1, sort, query } = req.query;
           logger.info("Obteniendo productos con parámetros:", { limit, page, sort, query });
            const products = await productRepository.getProducts(limit, page, sort, query);
           logger.info("Productos obtenidos exitosamente:", products);
            res.json(products);
        } catch (error) {
           logger.error("Error al obtener los productos:", error);
            res.status(500).json({ error: "Error interno del servidor al obtener los productos" });
        }
    }

    async getProductsById(req, res) {
        const id = req.params.pid;
        try {
           logger.info("Obteniendo producto por ID:", id);
            const sought = await productRepository.getProductsById(id);
            if (!sought) {
               logger.info("Producto no encontrado con ID:", id);
                return res.status(404).json({ error: "Producto no encontrado" });
            }
           logger.info("Producto encontrado:", sought);
            res.json(sought);
        } catch (error) {
           logger.error("Error al obtener el producto por ID:", error);
            res.status(500).json({ error: "Error interno del servidor al obtener el producto por ID" }); 
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.pid;
            const updatedProduct = req.body;

           logger.info("Actualizando producto con ID:", id);
            const result = await productRepository.updateProduct(id, updatedProduct);
           logger.info("Producto actualizado exitosamente:", result);
            res.json(result);
        } catch (error) {
           logger.error("Error al actualizar el producto:", error);
            res.status(500).json({ error: "Error interno del servidor al actualizar el producto" }); 
        }
    }

    async deleteProduct(req, res) {
        const id = req.params.pid;
        try {
           logger.info("Eliminando producto con ID:", id);
            let answer = await productRepository.deleteProduct(id);
           logger.info("Producto eliminado exitosamente:", answer);
            res.json(answer);
        } catch (error) {
           logger.error("Error al eliminar el producto:", error);
            res.status(500).json({ error: "Error interno del servidor al eliminar el producto" }); 
        }
    }

    async mockingProducts(req, res){
        const products = [];
        for(let i = 0 ; i <100; i ++ ){
            products.push(generateProducts())
        }
       logger.info("Productos de simulación generados:", products);
        res.json(products);
    }
}

module.exports = ProductController;
