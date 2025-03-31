const productModel = require('../models/product.model');

module.exports = {
    createNewProductService: async (productData) => {
        try {
            const newProduct = await productModel.create(productData);
            console.log(">>> check result: ", newProduct);

            return newProduct;
        } catch (error) {
            console.log(">>> check error:", error);
            return null;
        }
    },
    getProductsService: async (page, per_page) => {
        try {
            const skip = (page - 1) * per_page;

            const products = await productModel
                .find()
                .populate('category_id')
                .sort({ createdAt: -1 })
                .skip(skip) // bo qua 20
                .limit(per_page) // lay tu 21-30
                .exec(); //10
            console.log(">>> check result: ", products);


            const count = await productModel.countDocuments();

            return {
                current_page: +page,
                total_page: Math.ceil(count / per_page),
                count,
                products,
            }

        } catch (error) {
            console.log(">>> check error:", error);
            return null;
        }
    },
    updateProductByService: async (product_id, updateData) => {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(
                product_id,
                { $set: updateData },
                { new: true } // Trả về dữ liệu sau khi cập nhật
            );
            
            return updatedProduct
        } catch (error) {
            console.log(">>> check error:", error);
            return null;
        }
    },
    deleteProductByService: async (product_id) => {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(product_id);

            return deletedProduct
        } catch (error) {
            console.log(">>> check error:", error);
            return null;
        }
    },
    getProductByIdService: async (product_id) => {
        try {
            const product = await productModel.findById(product_id);

            return product;
        } catch (error) {
            console.log(">>> check error:", error);
            return null;
        }
    },
    getProductByCategoryIdService: async (category_id, page, per_page) => {
        try {
            const skip = (page - 1) * per_page;

            const body_query = { category_id }

            const products = await productModel
                .find(body_query)
                .populate('category_id')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(per_page)
                .exec();

            const count = await productModel.countDocuments(body_query)

            return {
                current_page: +page,
                total_page: Math.ceil(count / per_page),
                count,
                products,
            };
        } catch (error) {
            console.log(">>> check error:", error);
            return null;
        }
    },
    checkExistingProductFileByRegex: async (fileRegex) => {
        // Tìm document có ít nhất một ảnh trong mảng image khớp với fileRegex
        const existingFile = await productModel.findOne({
            $or: [
                { image: { $regex: fileRegex } }, // Trường hợp image là chuỗi
                { image: { $elemMatch: { $regex: fileRegex } } } // Trường hợp image là mảng
            ]
        });
        console.log("existing File: ", existingFile)

        if (!existingFile) return null;

        // Lọc các ảnh trùng lặp
        const duplicateImages = Array.isArray(existingFile.image)
            ? existingFile.image.filter(img => fileRegex.test(img))
            : fileRegex.test(existingFile.image) ? [existingFile.image] : [];

        return duplicateImages.length > 0 ? { _id: existingFile._id, images: duplicateImages } : null;

    }
}