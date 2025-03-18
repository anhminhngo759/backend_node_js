// const { userRegistrationService } = require('../../services/registrationService')

// const handleUserRegistration = async (req, res) => {
//     console.log(">>> req.body: ", req.body)
//     let email = req.body.email
//     let name = req.body.name
//     let phone = req.body.phone
//     let address = req.body.address

//     let result = await userRegistrationService(email, name, phone, address)
//     console.log(">>> result_register: ", result)

//     res.redirect('/')
// }


// module.exports = {
//     handleUserRegistration
// }

const { userRegistrationService, checkEmailExists } = require('../../services/registrationService');

const handleUserRegistration = async (req, res) => {
    try {
        const { email, name, phone, address, password } = req.body;

        // Nếu email chưa tồn tại, thực hiện đăng ký người dùng
        const result = await userRegistrationService(email, name, phone, address, password);
        console.log("Registration :", result)
        
        if (result.success) {
            // return res.json({ success: true, message: 'Registration successful!' }); // Đăng ký thành công
            res.redirect('/'); // Đăng ký thành công
        } 
        else {
            return res.json({ success: false, message: result.message });
            // res.render('register', { errorMessage: result.message }); // Gửi lỗi ra view
        }
    } catch (error) {
        console.error(">>> Registration error: ", error);
    }
};

const handleCheckEmailExists = async (req, res) => {
    const { email } = req.body;
    console.log("req.body: ",req.body)
    try {
        const result = await checkEmailExists(email);
        console.log("result check email : ", result) 
        return res.json(result);
    } catch (error) {
        console.error('Error checking email:', error);
    }
};

module.exports = {
    handleUserRegistration, handleCheckEmailExists
};