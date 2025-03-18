// khai bao route
const express = require('express')
const categoryRoute = require('./category.route')
const productRoute = require('./product.route')
const authRoute = require('./auth.route')

const router = express.Router()

router.use('/categories', categoryRoute);

router.use('/products', productRoute)

router.use('/auth', authRoute)

module.exports = router