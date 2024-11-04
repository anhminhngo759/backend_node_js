//import express
require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
// console.log("check env: ",process.env)

const webRoute = require('./routes/web')
const connection = require('./config/database')

// app express
const app = express()
//port
const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME

// config template engine
configViewEngine(app)

app.use('/', webRoute)



// simple query



// khoi chay server
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})