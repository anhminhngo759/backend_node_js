const Customer = require("../models/customer")
const Product = require("../models/products")
const Category = require("../models/categories"); // Đường dẫn đến tệp category model

const getAllHomeService = async (limit, page) => {
    try {
        let result = null
        if (limit && page) {
            let offset = (page - 1) * limit
            result = await Customer.find({}).skip(offset).limit(limit).exec();
        } else {
            result = await Customer.find({})
        }

        return result
    } catch (error) {
        console.log(">>> check error:", error)
        return null
    }

}

const getProductByCategoryService = async (limit, page) => {
    try {
        let result = null
        if (limit && page) {
            let offset = (page - 1) * limit
            result = await Category.find({})
                .populate({
                    path: 'product', // Field tham chiếu tới bảng Product
                    select: 'name images description quantity price stock sold_quantity', // Chỉ lấy các trường cần thiết
                })
                .skip(offset)
                .limit(limit)
                .exec();
        } else {
            result = await Category.find({})
                .populate({
                    path: 'product', // Field tham chiếu tới bảng Product
                    select: 'name images description quantity price stock sold_quantity', // Chỉ lấy các trường cần thiết
                })
                .skip(offset)
                .limit(limit)
                .exec();
        }

        return result
    } catch (error) {
        console.log(">>> check error:", error)
        return null
    }

}

module.exports = {
    getAllHomeService, getProductByCategoryService
}