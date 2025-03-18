const User = require("../models/account.model")
const { uploadSingleFile, uploadMultipleFiles } = require("../services/fileService");

const getUsersAPI = async (req, res) => {
    // console.log(" >>> result: ", results)
    let results = await User.find({})

    return res.status(200).json(
        {
            EC: 0,
            data: results
        }
    )
}

const postCreateUserAPI = async (req, res) => {
    let email = req.body.email
    let name = req.body.myname
    let phone = req.body.phone
    let address = req.body.address
    let role = req.body.role

    let user = await User.create({
        email: email,
        name: name,
        phone: phone,
        address: address,
        role: role
    })

    return res.status(200).json(
        {
            EC: 0,
            data: user
        }
    )
}

const putUpdateUserAPI = async (req, res) => {
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city
    let userId = req.body.userId

    let user = await User.updateOne({ _id: userId }, { name: name, email: email, city: city });
    return res.status(200).json(
        {
            EC: 0,
            data: user
        }
    )
}

const deleteUserAPI = async (req, res) => {
    const id = req.body.userId

    let result = await User.deleteOne({
        _id: id
    })

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const postUploadSingleFileApi = async (req, res) => {
    console.log("req.files =", req.files)
    console.log("req.files =", req.files.image)
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    let result = await uploadSingleFile(req.files.image)
    console.log(">>> check result: ", result)

    // return res.send("ok send")

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const postUploadMultipleFileApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    console.log(req.files);
    //upload single => files is an object
    //upload multiple => files is an array
    if (Array.isArray(req.files.image)) {
        //upload multiple
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            EC: 0,
            data: result
        })

    } else {
        //upload single
        return await postUploadSingleFileApi(req, res);
    }
}

module.exports = {
    getUsersAPI, postCreateUserAPI,
    putUpdateUserAPI, deleteUserAPI,
    postUploadSingleFileApi, postUploadMultipleFileApi
}