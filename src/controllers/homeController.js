const connection = require('../config/database')
const { getAllUsers, getUserById,
    updateUserById, deleteUserById } = require('../services/CRUDService')

const User = require("../models/user")

const getHomepage = async (req, res) => {
    // console.log(" >>> result: ", results)
    let results = await User.find({})
    return res.render('home.ejs', { listUsers: results })
}

const getABC = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    // console.log(">>> req.body: ", req.body)
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city

    await User.create({
        email: email,
        name: name,
        city: city
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
    postHandleRemoveUser
}