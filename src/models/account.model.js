const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const accountSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: String,
    phone: String,
    role: {
        type: String,
        enum: ['admin','user'],
        default: 'user',
    },
}, {
    versionKey: false,
});

// dùng để mã hóa mật khẩu trước khi lưu vào dữ liệu
accountSchema.pre('save', function (next) {
    const account = this;
    if (account.password) {
        account.password = bcryptjs.hashSync(account.password, 10);
    }
    next();
});

// dùng để xóa password khi gửi về client
accountSchema.set('toJSON', {
    transform: function (doc, ret, options) {
      delete ret.password;
    },
  });

module.exports = mongoose.model('account',accountSchema);