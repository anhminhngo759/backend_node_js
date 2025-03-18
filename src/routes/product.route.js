const express = require('express')

const { getProductDetail } = require('../controllers/api/product.controller')

const router = express.Router()

router.get('/:id', getProductDetail)

export default productRoute