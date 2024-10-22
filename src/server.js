//import express
const express = require('express')
const path = require('path');

require('dotenv').config()
// console.log("check env: ",process.env)
// app express
const app = express()
//port
const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME

// config template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// khai bao route
app.get('/', (req, res) => {-
  res.send('Hello World!')
})

app.get('/abc', (req, res) => {
    // res.send('check ABC!')
    res.render('sample.ejs')
  })

// khoi chay server
app.listen(port,hostname, () => {
  console.log(`Example app listening on port ${port}`)
})