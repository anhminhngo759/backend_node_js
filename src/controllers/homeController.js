const connection = require('../config/database')
const getHomepage = (req, res) => {
    //process data
    //call model
    let model = []
    connection.query(
        'select * from Users u',
        function (err, results, fields) {
            users = results
            console.log(">>>results= ", results); // results contains rows returned by server
            // console.log(">>> fields= ", fields); // fields contains extra meta data about results, if available
            res.send(JSON.stringify(users))
        }
    );


}

const getABC = (req, res) => {
    res.render('sample.ejs')
}

module.exports = {
    getHomepage, getABC
}