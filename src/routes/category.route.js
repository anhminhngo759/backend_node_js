const express = require('express');
const router = express.Router();

const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/api/category.controller');

router.route('/').post(createCategory);
router.route('/').get(getCategories);
router.route('/:id').put(updateCategory);
router.route('/:id').delete(deleteCategory);

module.exports = router;