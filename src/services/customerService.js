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

module.exports = {
    createCustomerService, createArrayCustomerService,
    getAllCustomerService
}