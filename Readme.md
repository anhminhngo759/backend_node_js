
# Project với NodeJS (Express/MongoDB) 
## Giới thiệu
Dự án Backend RESTful API được xây dựng bằng Node.js và sử dụng các công nghệ bao gồm Express.js, MongoDB, MySQL, Docker.

## Branches và cấu trúc file

### Branch: `main_sql`
#### Cấu trúc thư mục

```plaintext
├── src
│   ├── config
│   │   ├── database.js
│   │   └── viewEngine.js
│   ├── controllers
│   │   └── homeController.js
│   ├── middlewares
│   ├── public
│   │   ├── css
│   │   ├── images
│   │   └── js
│   ├── routes
│   │   └── web.js
│   ├── services
│   │   └── CRUDService.js
│   ├── views
│   │   ├── create.ejs
│   │   ├── delete.ejs
│   │   ├── edit.ejs
│   │   └── home.ejs
│   └── server.js
```
#### Chức năng chính
- Quản lý người dùng với MySQL và Docker.
- Thêm, sửa, xóa người dùng
- Xử lý giao diện và hiển thị thông tin người dùng bằng template Ejs

## API Endpoints
### Người dùng
- **GET** `/` - Lấy thông tin trang người dùng.
- **GET** `/create` - Trang thêm người dùng mới.
- **GET** `/update/:id` - Trang cập nhật thông tin người dùng.
- **POST** `/create-use` - Xử lý thêm người dùng mới.
- **POST** `/update-user` - Xử lý cập nhật thông tin người dùng.
- **POST** `/delete-user/:id` - Trang xóa người dùng.
- **POST** `/delete-user/` - Xử lý xóa người dùng.


### Branch: `main_mongodb`
#### Cấu trúc thư mục

```plaintext
├── src
│   ├── config
│   │   ├── database.js
│   │   └── viewEngine.js
│   ├── controllers
│   │   ├── apiController.js
│   │   ├── customerController.js
│   │   └── homeController.js
│   ├── middlewares
│   ├── models
│   │   ├── customer.js
│   │   ├── user.js
│   ├── public
│   │   ├── css
│   │   ├── images
│   │   └── js
│   ├── routes
│   │   ├── api.js
│   │   └── web.js
│   ├── services
│   │   ├── CRUDService.js
│   │   ├── customerService.js
│   │   └── fileService.js
│   ├── views
│   │   ├── create.ejs
│   │   ├── delete.ejs
│   │   ├── edit.ejs
│   │   └── home.ejs
│   └── server.js
```
#### Chức năng chính
- Quản lý người dùng, khách hàng với MongoDB, Docker và thư viện Mongoose.
- Thêm, sửa, xóa người dùng
- Thêm, xóa nhiều khách hàng, sửa mỗi khách hàng.
- Lấy danh sách khách hàng (phân trang, lọc theo tên) .
- Tải lên một, nhiều tệp hình ảnh.

## API Endpoints
### Người dùng
- **GET** `/users` - Lấy danh sách người dùng.
- **POST** `/users` - Thêm người dùng mới .
- **PUT** `/users` - Cập nhật thông tin người dùng.
- **DELETE** `/users` - Xóa người dùng.

### Khách hàng
- **GET** `/customers` - Lấy danh sách khách hàng (phân trang, lọc theo tên).
- **POST** `/file` - Tải lên một tệp hình ảnh.
- **POST** `/files` - Tải lên nhiều tệp hình ảnh.
- **POST** `/customers` - Thêm khách hàng mới.
- **POST** `/customers-many` - Thêm nhiều khách hàng mới.
- **PUT** `/customers` - Thay đổi khách hàng mới.
- **DELETE** `/customers` - Xóa khách hàng .
- **DELETE** `/customers-many` - Xóa nhiều khách hàng.