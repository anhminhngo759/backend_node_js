const Customer = require("../models/customer")

const createCustomerService = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.image
        })

        console.log(">>> check result: ", result)
        return result

    } catch (error) {
        console.log(error)
        return null
    }
}

const createArrayCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr)
        return result

    } catch (error) {
        console.log(">>> check error:", error)
        return null
    }
}

const getAllCustomerService = async () => {
    try {
        let result = await Customer.find({})
        return result
    } catch (error) {
        console.log(">>> check error:", error)
        return null
    }

}

const updateCustomerService = async (id, name, address, email) => {
    try {
        let result = await Customer.updateOne({ _id: id }, { name, address, email })
        console.log(">>> check result :", result)
        return result

    } catch (error) {
        console.log(">>> check error:", error)
        return null
    }
}

const deleteACustomerService = async (id) => {
    try {
        let result = await Customer.deleteById(id)
        console.log(">>> check result :", result)
        return result

    } catch (error) {
        console.log(">>> check error:", error)
        return null
    }
}

const deleteArrayCustomerService = async (arrIds) => {
    try {
        let result = await Customer.delete({ _id: { $in: arrIds } })
        console.log(">>> check result :", result)
        return result

    } catch (error) {
        console.log(">>> check error:", error)
        return null
    }
}

module.exports = {
    createCustomerService, createArrayCustomerService,
    getAllCustomerService, updateCustomerService,
    deleteACustomerService, deleteArrayCustomerService
}