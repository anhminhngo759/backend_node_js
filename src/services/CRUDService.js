const connection = require('../config/database')

const getAllUsers = async () => {
    const [results, fields] = await connection.query('select * from Users');
    return results
}

const getUserById = async (userId) => {
    const [results, fields] = await connection.query('select * from Users where id = ? ', [userId]);
    console.log(" >>> result: ", results)
   // console.log(">>> req.params :: ",req.params, userId)

   let user = results && results.length > 0 ? results[0] : {}
   return user
}

const updateUserById = async (email, name, city, userId) => {
    let [results, fields] = await connection.query(
        `update Users
        set email = ?,name = ?,city = ?
        where id = ?
        `, [email, name, city, userId]
    )
    // console.log(" >>> result: ", results)
}

module.exports = {
    getAllUsers, getUserById,
    updateUserById
}