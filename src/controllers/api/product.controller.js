const { findProductById } = require('../../services/productService')

const getProductDetail = async (req, res) => {
    try {
        const productId = req.params.id; // Lấy ID sản phẩm từ URL

        const product = await findProductById(productId)
        // if (!product) {
        //     // Xử lý khi không tìm thấy sản phẩm
        //     return res.status(404).render('404.ejs', { message: "Product not found" });
        // }
        console.log("Product details: ", product);
        // Render view với dữ liệu sản phẩm
        res.render('product/product-detail.ejs', { productDetail: product });
    } catch (error) {
        console.error("Error fetching product details:", error);
        // res.status(500).render('500.ejs', { message: "Internal server error" });
    }
};

module.exports = {
    getProductDetail
}