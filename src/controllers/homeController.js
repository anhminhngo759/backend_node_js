const connection = require('../config/database')
const { getAllUsers } = require('../services/CRUDService')

const getHomepage = async (req, res) => {
    // console.log(" >>> result: ", results)
    let results = await getAllUsers()
    return res.render('home.ejs', {listUsers: results})
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

    let [results, fields] = await connection.query(
        `INSERT INTO 
        Users (email, name, city)
        VALUES (?, ?, ?);`,
        [email, name, city]
    )

    console.log(" >>> result: ", results)
    res.send(' Created user succeed !')

    // connection.query(
    //     `INSERT INTO 
    //     Users (email, name, city)
    //     VALUES (?, ?, ?);`,
    //     [email, name, city],
    //     function(err, results) {
    //       console.log(results);
    //       res.send(' Created user succeed !')
    //     }
    // )
    // const [results, fields] = await connection.query('select * from Users');
    // console.log(" >>> result: ", results)
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}


module.exports = {
    getHomepage, getABC,
    postCreateUser, getCreatePage
}