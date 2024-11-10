// khai bao route
const express = require('express')

const routerAPI = express.Router()

const {getUsersAPI, } = require('../controllers/apiController')

// router.Method('/route',handler)
routerAPI.get('/', (req,res) => {
    res.send(" hello world")
})

routerAPI.get('/users', getUsersAPI)

module.exports = routerAPI