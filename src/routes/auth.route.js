const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout
} = require('../controllers/auth.controller');
const { isAuthenticated, checkRole } = require('../middlewares/auth.middleware');
// const asyncMiddleware = require("../middlewares/async.middeware");

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(isAuthenticated, logout)

// Route chỉ dành cho admin
router.route('/admin-only')
    .get(isAuthenticated, checkRole(['admin']), (req, res) => {
        res.json({ message: "Welcome admin!" });
    });

module.exports = router