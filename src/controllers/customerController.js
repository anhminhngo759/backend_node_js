const { uploadSingleFile } = require("../services/fileService")
const { createCustomerService, createArrayCustomerService,
    getAllCustomerService, updateCustomerService,
    deleteACustomerService, deleteArrayCustomerService } = require("../services/customerService")

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
    },
    getAllCustomers: async (req, res) => {
        console.log(req.query)
        let limit = req.query.limit
        let page = req.query.page
        let name = req.query.name
        let result = null
        if (limit && page) {
            result = await getAllCustomerService(limit, page, name)
            console.log(">>> result: ", result)
            return res.status(200).json(
                {
                    EC: 0,
                    data: result
                }
            )
        } else {
            result = await getAllCustomerService()
            return res.status(200).json(
                {
                    EC: 0,
                    data: result
                }
            )
        }


    },
    putUpdateCustomers: async (req, res) => {
        let { id, name, address, email } = req.body

        let result = await updateCustomerService(id, name, address, email)
        console.log(">>> result: ", result)

        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },
    deleteACustomer: async (req, res) => {
        let id = req.body.id
        console.log("id: ", id)
        console.log("id: ", typeof (id))
        let result = await deleteACustomerService(id)
        console.log(result)

        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },
    deleteArrayCustomer: async (req, res) => {
        let ids = req.body.customersId
        console.log(">>> check data: ", ids)
        let result = await deleteArrayCustomerService(ids)
        console.log(result)

        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    }
}