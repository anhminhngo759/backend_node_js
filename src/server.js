//import express
require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override');
const configViewEngine = require('./config/viewEngine')
const webRoute = require('./routes/web')
const apiRoute = require('./routes/api')

const connection = require('./config/database')

// app express
const app = express()
//port
const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME

// Sử dụng methodOverride để hỗ trợ PUT và DELETE
app.use(methodOverride('_method'));

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true }))

// config template engine
configViewEngine(app)

app.use('/', webRoute);
app.use('/v1/api/', apiRoute);


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
