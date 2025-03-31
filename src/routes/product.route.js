const express = require("express");

const router = express.Router();

const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    findProductById,
    getProductsByCategoryId
} = require("../controllers/product.controller")
const { isAuthenticated, checkRole } = require("../middlewares/auth.middleware");

// Route công khai (khách hàng chưa đăng nhập cũng xem được)
router.get('/', getProducts);                    // Xem tất cả products
router.get('/:id', findProductById);             // Xem chi tiết product
router.get('/category/:category_id', getProductsByCategoryId); // Xem theo category

// router.use(isAuthenticated);

// // Route chỉ dành cho admin
// router.use(checkRole(['admin']));
router.post('/', createProduct);      // Chỉ admin tạo được
router.put('/:id', updateProduct);    // Chỉ admin sửa được
router.delete('/:id', deleteProduct); // Chỉ admin xóa được

module.exports = router