const accountModel = require('../../models/account.model')
const bcryptjs = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        try {
            const { username, ...body } = req.body;
            // console.log(username)
            // console.log(body)

            const account = await accountModel.findOne({ username });

            if (account) {
                return res.status(400).json({ EC: 1, message: " User already exists " });
            }

            const newAccount = await accountModel.create({ username, ...body });
            return res.status(201).json({
                EC: 0,
                message: " Register successfully",
                data: newAccount
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }

    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const account = await accountModel.findOne({ username });
            console.log("account : ", account)

            // kiểm tra username có tồn tại hay không
            if (!account) {
                return res.status(400).json({ EC: 1, message: " Incorrect username or password1" });
            }

            // Kiểm tra mật khẩu
            if (!bcryptjs.compareSync(password, account.password)) {
                return res.status(400).json({ EC: 1, message: " Incorrect password2" });
            }

            return res.status(200).json({
                EC: 0,
                message: " Login successfully",
                data: account
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    }
}