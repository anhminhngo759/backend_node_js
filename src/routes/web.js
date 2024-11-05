// khai bao route
const express = require('express')
const { getHomepage, getABC, postCreateUser } = require('../controllers/homeController')
const router = express.Router()

// router.Method('/route',handler)
router.get('/', getHomepage)

router.get('/abc', getABC)

router.post('/create-user', postCreateUser)

module.exports = router