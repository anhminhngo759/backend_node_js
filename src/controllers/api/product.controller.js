const { create } = require('connect-mongo');
const productModel = require('../../models/product.model');

module.exports = {
    createProduct: async (req, res) => {
        try {
            const body = req.body;

            const newProduct = await productModel.create({ body });

            return res.status(201).json({
                EC: 0,
                message: "Product created successfully",
                data: newProduct
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },
    getProducts: async (req, res) => {
        try {
            const page = req.params.page || 1
            const per_page = 10

            const products = await productModel
                .find()
                .populate('category_id')
                .sort({ createdAt: -1 })
                .skip(page * per_page - per_page)
                .limit(per_page)
                .exec();

            const count = await productModel.countDocuments();

            return res.status(200).json({
                EC: 0,
                message: "Product got successfully",
                current_page: +page,
                total_page: Math.ceil(count / per_page),
                count: count,
                data: products
            })

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const product_id = req.params.id;
            const body = req.body;

            const updatedProduct = await findByIdAndUpdate({ _id: product_id }, { $set: body });

            if (!updatedProduct) {
                return res.status(404).json({
                    EC: 1,
                    message: `Product not found, id: ${product_id}`
                });
            }

            return res.status(200).json({
                EC: 0,
                message: "Product updated successfully",
                data: updatedProduct
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }

    },
    deleteProduct: async (req, res) => {
        try {
            const product_id = req.params.id;

            const deletedProduct = await productModel.findByIdAndDelete(product_id);

            if (!deletedProduct) {
                return res.status(404).json({
                    EC: 1,
                    message: `Product not found, id: ${product_id}`
                });
            }

            return res.status(200).json({
                EC: 0,
                message: "Product deleted successfully",
                data: deletedProduct
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },
    findProductById: async (req, res) => {
        try {
            const product_id = req.params.id;

            const product = await productModel.findById(product_id);

            if (!product) {
                return res.status(404).json({
                    EC: 1,
                    message: `Product not found, id: ${product_id}`
                });
            }

            return res.status(200).json({
                EC: 0,
                message: "find Product by id successfully",
                data: product
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },
    getProductsByCategoryId: async (req, res) => {
        try {
            const page = req.params.page || 1;
            const per_page = 10;
            const category_id = req.params.category_id;
            const body_query = { category_id };

            const products = await productModel
                .findById(body_query)
                .populate('category_id')
                .sort({ createdAt: -1 })
                .skip(page * per_page - per_page)
                .limit(per_page)
                .exec();

            const count = await productModel.countDocuments();

            if (!products) {
                return res.status(404).json({
                    EC: 1,
                    message: `Product not found by category id: ${category_id}`
                });
            }

            return res.status(200).json({
                EC: 0,
                message: "get product by category id successfully",
                current_page: + page,
                total_page: Math.ceil(count / per_page),
                count: count,
                data: products
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },
}