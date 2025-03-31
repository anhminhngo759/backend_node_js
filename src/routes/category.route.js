const express = require('express');

const router = express.Router();

const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require("../controllers/category.controller");
// const { isAuthenticated, checkRole } = require('../middlewares/auth.middleware');

// Route công khai
router.get('/', getCategories); // Ai cũng xem được danh sách categories

// Route bảo vệ cho admin
// router.use(isAuthenticated, checkRole(['admin'])); // Áp dụng chung cho tất cả route phía dưới

router.post('/', createCategory);   // Chỉ admin tạo được
router.put('/:id', updateCategory); // Chỉ admin sửa được
router.delete('/:id', deleteCategory); // Chỉ admin xóa được

module.exports = router;