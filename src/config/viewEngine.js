const path = require('path');
const express = require('express')

const configViewEngine = (app) => {
    console.log('check dirname : ', __dirname)
    // console.log('check dirname : ', path.join('./src', 'views','user'))
    app.set('views', path.join('./src', 'views'));
    app.set('view engine', 'ejs')
    // config static files: img/css/js
    app.use(express.static(path.join('./src', 'public')));
}

module.exports = configViewEngine