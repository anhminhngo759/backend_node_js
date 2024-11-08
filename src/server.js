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

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true }))

// config template engine
configViewEngine(app)

app.use('/', webRoute);

(async () => {
  try {
    await connection()
    app.listen(port, hostname, () => {
      console.log(`Backend app listening on port ${port}`)
    })
  } catch (error) {
    console.log(">>> Error connect to DB: ", error)
  }
})()
// khoi chay server
