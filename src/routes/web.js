// khai bao route
const express = require('express')
const { getHomepage, getABC, postCreateUser,
    getCreatePage, getUpdatePage,
    postUpdateUser, postDeleteUser,
    postHandleRemoveUser, getPageRegister,
    getPageAboutUs
} = require('../controllers/homeController')



const router = express.Router()

// router.Method('/route',handler)
router.get('/', getHomepage)
router.get('/users/register', getPageRegister)
router.get('/about-us', getPageAboutUs)
router.get('/abc', getABC)

router.get('/create', getCreatePage)
router.get('/update/:id', getUpdatePage)

router.post('/create-user', postCreateUser)
router.put('/update-user', postUpdateUser);

router.delete('/delete-user/', postHandleRemoveUser);
router.get('/delete-user/:id', postDeleteUser);


module.exports = router