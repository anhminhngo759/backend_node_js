// const connection = require('../config/database')
const { getAllUsers, getUserById,
    updateUserById, deleteUserById } = require('../services/CRUDService')

const { getAllHomeService, getProductByCategoryService } = require('../services/homeService')

const User = require("../models/user")
const Customer = require("../models/customer")
const Category = require("../models/categories")
const Product = require("../models/products")
// const getHomepage = async (req, res) => {
//     let results = await Customer.find({})
//     return res.render('index.ejs', { listCustomer: results })
// }

const getHomepage = async (req, res) => {
    // console.log(req.query)
    let limit = 5
    let page = 1
    let result = null
    let re = null
    if (limit && page) {
        result = await getAllHomeService(limit, page)
        re = await getProductByCategoryService(limit, page)
        console.log(">>> result: ", result)
        console.log(">>> re: ", re)
        
        return res.render('index.ejs', { listCustomer: result, listProduct: re })
    } else {
        result = await getAllHomeService()
        return res.render('index.ejs', { listCustomer: result, listProduct: re })
    }

}


// getHomepage()

const getPageRegister = (req, res) => {
    res.render('user/register.ejs')
}

const getPageAboutUs = (req, res) => {
    res.render('pages/about-us.ejs')
}


const getABC = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    // console.log(">>> req.body: ", req.body)
    let email = req.body.email
    let name = req.body.myname
    let phone = req.body.phone
    let address = req.body.address
    let role = req.body.role


    await User.create({
        email: email,
        name: name,
        phone: phone,
        address: address,
        role: role
    })

    res.send(' Created user succeed !')
}

const postUpdateUser = async (req, res) => {
    // console.log(">>> req.body: ", req.body)
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city
    let userId = req.body.userId

    await User.updateOne({ _id: userId }, { name: name, email: email, city: city });
    res.redirect('/')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id
    let user = await User.findById(userId).exec()
    res.render('edit.ejs', { userEdit: user })
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id
    let user = await User.findById(userId).exec()
    res.render('delete.ejs', { userEdit: user })
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId

    let result = await User.deleteOne({
        _id: id
    })

    console.log(">>> result: ", result)
    res.redirect('/')
}

module.exports = {
    getHomepage, getABC,
    postCreateUser, getCreatePage, getUpdatePage,
    postUpdateUser, postDeleteUser,
    postHandleRemoveUser, getPageRegister,
    getPageAboutUs
}