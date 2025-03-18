// khai bao route
const express = require('express')

const { getPageRegister } = require('../controllers/api/home.controller')

const { handleUserRegistration, handleCheckEmailExists } = require('../controllers/auth/auth.controller')

const router = express.Router()

router.get('/register', getPageRegister)

router.post('/register', handleUserRegistration)

router.post('/check-email', handleCheckEmailExists )

export default authRoute