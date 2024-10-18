//import express
const express = require('express')
// app express
const app = express()
//port
const port = 3000

// config template engine
app.set('views', './views')
app.set('view engine', 'ejs')

// khai bao route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/abc', (req, res) => {
    res.send('check ABC!')
  })

// khoi chay server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})