// khai bao route
const express = require('express')

const routerAPI = express.Router()

const { getUsersAPI, postCreateUserAPI,
    putUpdateUserAPI, deleteUserAPI,
    postUploadSingleFileApi, postUploadMultipleFileApi } = require('../controllers/apiController')

routerAPI.get('/users', getUsersAPI)

routerAPI.post('/users', postCreateUserAPI)

routerAPI.put('/users', putUpdateUserAPI)

routerAPI.delete('/users', deleteUserAPI)

routerAPI.post('/file', postUploadSingleFileApi)

routerAPI.post('/files', postUploadMultipleFileApi)

module.exports = routerAPI