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

module.exports = {
    createCustomerService
}