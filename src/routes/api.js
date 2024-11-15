// khai bao route
const express = require('express')

const routerAPI = express.Router()

const { getUsersAPI, postCreateUserAPI,
    putUpdateUserAPI, deleteUserAPI,
    postUploadSingleFileApi, postUploadMultipleFileApi,
} = require('../controllers/apiController')

const { postCreateCustomer, postCreateArrayCustomer,
    getAllCustomers, putUpdateCustomers, 
    deleteACustomer, deleteArrayCustomer } = require('../controllers/customerController')

routerAPI.get('/users', getUsersAPI)
routerAPI.post('/users', postCreateUserAPI)
routerAPI.put('/users', putUpdateUserAPI)
routerAPI.delete('/users', deleteUserAPI)

routerAPI.post('/file', postUploadSingleFileApi)
routerAPI.post('/files', postUploadMultipleFileApi)

routerAPI.post('/customers', postCreateCustomer)
routerAPI.post('/customers-many', postCreateArrayCustomer)
routerAPI.get('/customers', getAllCustomers)
routerAPI.put('/customers', putUpdateCustomers)
routerAPI.delete('/customers', deleteACustomer)
routerAPI.delete('/customers-many', deleteArrayCustomer)

module.exports = routerAPI