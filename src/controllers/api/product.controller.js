const {
    createNewProductService,
    getProductsService,
    updateProductByService,
    deleteProductByService,
    getProductByIdService,
    getProductByCategoryIdService
} = require('../../services/product.service')

const { checkExistingProductFile } = require("../../services/file.service")
const { uploadMultipleFiles } = require("../../services/upload.service")


module.exports = {
    createProduct: async (req, res) => {
        try {
            const { name, description, price, stock, category_id } = req.body;
            const imgFile = req.files?.image;

            // Validate required fields
            if (!name) {
                return res.status(400).json({ EC: 1, message: "Name is required" });
            }

            if (!imgFile) {
                console.log(">>> No image file detected");
                return res.status(400).json({ EC: 1, message: "Image file is required" });
            }

            // Convert single file or array into an array
            const imageFiles = Array.isArray(imgFile) ? imgFile : [imgFile];

            // Upload files
            const result = await uploadMultipleFiles(imageFiles);
            console.log(">>>> result: ", result);

            if (result.countSuccess === 0) {
                return res.status(400).json({
                    EC: 1,
                    message: "Failed to upload images",
                    errorDetails: result.detail,
                });
            }

            // Extract successful paths
            const imageUrl = result.detail
                .filter(item => item.status === 'success')
                .map(item => item.path);

            // Prepare product data
            const productData = {
                name,
                description,
                image: imageUrl,
                price,
                stock,
                category_id
            };

            // Create new product
            const newProduct = await createNewProductService(productData);

            // Send success response
            return res.status(201).json({
                EC: 0,
                message: "Product created successfully",
                data: newProduct,
            });
        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },
    getProducts: async (req, res) => {
        const page = req.query.page || 1;
        const per_page = 10;

        const products = await getProductsService(page, per_page);

        return res.status(200).json({ products });
    },
    updateProduct: async (req, res) => {
        try {
            const product_id = req.params.id;
            console.log(product_id)
            const { name, description, price, stock, category_id } = req.body;

            const existingProduct = await getProductByIdService(product_id);
            if (!existingProduct) {
                return res.status(404).json({
                    EC: 1,
                    message: "Product not found"
                });
            }

            let imageUrl = existingProduct.image;

            if (req.files && req.files.image) {
                const imgFiles = Array.isArray(req.files.image) ? req.files.image : [req.files.image];

                const uploadedFileNames = imgFiles.map(file => file.name);
                console.log("Uploaded Files:", uploadedFileNames);

                const existingFiles = await checkExistingProductFile(uploadedFileNames);
                console.log("Existing Files:", existingFiles);

                // if (existingFiles && existingFiles.length > 0) {
                //     return res.status(400).json({
                //         EC: 1,
                //         message: `Image(s) ${existingFiles.join(', ')} already exist(s)`,
                //     });
                //     // Giữ nguyên imageUrl cũ
                // }

                if (!existingFiles) {
                    const result = await uploadMultipleFiles(imgFiles);
                    console.log(">>>> result: ", result);

                    if (result.countSuccess === 0) {
                        return res.status(400).json({
                            EC: 1,
                            message: "Failed to upload images",
                            errorDetails: result.detail,
                        });
                    }

                    imageUrl = result.detail
                        .filter(item => item.status === 'success')
                        .map(item => item.path);

                }
            }

            // Prepare product data
            const productData = {
                name,
                description,
                image: imageUrl,
                price,
                stock,
                category_id
            };

            const updatedProduct = await updateProductByService(product_id, productData);
            console.log("updatedProduct:", updatedProduct)

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

            const deletedProduct = await deleteProductByService(product_id);

            if (!deletedProduct) {
                return res.status(404).json({
                    EC: 1,
                    message: "Product not found"
                });
            }

            return res.status(200).json({
                EC: 0,
                message: "Product deleted successfully",
                data: deletedProduct
            });
        } catch (error) {
            console.error(">>> Delete product error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },
    findProductById: async (req, res) => {
        try {
            const product_id = req.params.id;

            const product = await getProductByIdService(product_id);

            if (!product) {
                return res.status(404).json({
                    EC: 1,
                    message: "Product not found"
                });
            }

            return res.status(201).json({
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
            const category_id = req.params.category_id;
            const page = req.params.page || 1;
            const per_page = 10;


            const result = await getProductByCategoryIdService(category_id, page, per_page);
            console.log("result: ", result)

            // Xử lý trường hợp không có sản phẩm
            if (result.products.length === 0) {
                return res.status(200).json({
                    EC: 0,
                    message: "No products found for this category",
                    current_page: result.current_page,
                    total_page: 0,
                    count: 0,
                    data: []
                });
            }

            return res.status(200).json({
                EC: 0,
                message: "find Product by category id successfully",
                current_page: result.current_page,
                total_page: result.total_page,
                count: result.count,
                data: result.products
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    }
}