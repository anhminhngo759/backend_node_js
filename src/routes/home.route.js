const express = require('express')
const { getHomepage
} = require('../controllers/api/home.controller')

const router = express.Router()

// router.Method('/route',handler)
router.get('/', getHomepage)

export default homeRoute