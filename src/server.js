//import express
require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override');
const configViewEngine = require('./config/viewEngine')
const webRoute = require('./routes/web')
const apiRoute = require('./routes/api')
const fileUpload = require('express-fileupload');

const connection = require('./config/database')
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { getProductByCategoryService } = require('./services/homeService')
// app express
const app = express()
//port
const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME

//config file upload
// default options
app.use(fileUpload());

// Sử dụng methodOverride để hỗ trợ PUT và DELETE
app.use(methodOverride('_method'));

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true }))

// config template engine
configViewEngine(app)

// Thêm cấu hình session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Khóa bí mật để mã hóa session
  resave: false, // Không lưu lại session nếu không thay đổi
  saveUninitialized: false, // Không lưu session mới nếu không có dữ liệu
  cookie: { secure: false }, // Đặt thành `true` nếu chạy trên HTTPS
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
}));

app.use(async (req, res, next) => {
  if (!req.session.categories) {
    req.session.categories = await getProductByCategoryService(5, 1); // Lấy dữ liệu từ database và lưu vào session
  }
  res.locals.categories = req.session.categories; // Truyền sang view
  next();
});

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
