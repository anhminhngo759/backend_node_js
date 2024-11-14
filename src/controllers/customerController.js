const { uploadSingleFile } = require("../services/fileService")
const { createCustomerService, createArrayCustomerService } = require("../services/customerService")


module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, image, description } = req.body
        console.log(">>>> name :", name)
        console.log(">>>> address :", address)

        let imageUrl = ""

        if (!req.files || Object.keys(req.files).length === 0) {
        } else {
            // console.log(">>>> req.files image: ", req.files.image )
            let result = await uploadSingleFile(req.files.image)
            console.log(">>>> result :path ", result.path)
            imageUrl = result.path
        }

        let customerData = {
            name,
            address,
            phone,
            email,
            description,
            image: imageUrl
        }
        let customer = await createCustomerService(customerData)

        return res.status(200).json(
            {
                EC: 0,
                data: customer
            }
        )
    },
    postCreateArrayCustomer: async (req, res) => {
        console.log(">>> check data: ", req.body.customers)
        let customers = await createArrayCustomerService(req.body.customers)

        if (customers) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: customers
                }
            )
        } else {
            return res.status(400).json(
                {
                    EC: -1,
                    data: customers
                }
            )
        }


    }
}