const connection = require('../config/database')
const getHomepage = (req, res) => {
    return res.render('home.ejs')
}

const getABC = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = (req, res) => {
    // console.log(">>> req.body: ", req.body)
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city
    
    // console.log(">>> email= ", email, 'name = ', name, 'city = ', city)
    // res.send('create new user')

    connection.query(
        `INSERT INTO 
        Users (email, name, city)
        VALUES (?, ?, ?);`,
        [email, name, city],
        function(err, results) {
          console.log(results);
          res.send(' Created user succeed !')
        }
    )
}

module.exports = {
    getHomepage, getABC,
    postCreateUser
}