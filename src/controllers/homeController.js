const connection = require('../config/database')
const { getAllUsers, getUserById, 
    updateUserById, deleteUserById } = require('../services/CRUDService')

const User = require("../models/user")

const getHomepage = async (req, res) => {
    // console.log(" >>> result: ", results)
    let results = []
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

    console.log(">>> email= ", email, 'name = ', name, 'city = ', city)

    // let [results, fields] = await connection.query(
    //     `INSERT INTO 
    //     Users (email, name, city)
    //     VALUES (?, ?, ?);`,
    //     [email, name, city]
    // )
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

    console.log(">>> email= ", email, 'name = ', name, 'city = ', city, 'id =', userId)

    await updateUserById(email, name, city, userId)

    // res.send(' Updated user succeed !')
    res.redirect('/')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id
    let user = await getUserById(userId)
    res.render('edit.ejs', { userEdit: user })
}

const postDeleteUser = async (req, res) => {
    // res.send(' Delete user succeed !')
    const userId = req.params.id
    let user = await getUserById(userId)
    res.render('delete.ejs', { userEdit: user })
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId

    await deleteUserById(id)

    res.redirect('/')
}

module.exports = {
    getHomepage, getABC,
    postCreateUser, getCreatePage, getUpdatePage,
    postUpdateUser, postDeleteUser,
    postHandleRemoveUser
}