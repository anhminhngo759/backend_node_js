const express = require('express')

const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    findProductById,
    getProductsByCategoryId
} = require('../controllers/api/product.controller')

const router = express.Router()

router.route('/').post(createProduct);

router.route('/').get(getProducts);

router.route('/:id').put(updateProduct);

router.route('/:id').delete(deleteProduct);

router.route('/category/:category_id').get(getProductsByCategoryId)

router.route('/:id').get(findProductById);

module.exports = router;