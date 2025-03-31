const categoryModel = require("../models/category.model");

module.exports = {
    createNewCategoryService: async (categoryData) => {
        try {
            const newCategory = await categoryModel.create(categoryData);
            console.log(">>> check result: ", newCategory)

            return newCategory
        } catch (error) {
            console.log(">>> check error:", error)
            return null
        }
    },
    getCategoriesService: async () => {
        try {
            const category = await categoryModel.find();
            console.log(">>> check result: ", category)

            return category || []; // Trả về mảng rỗng nếu không có dữ liệu
        } catch (error) {
            console.log(">>> check error:", error)
            return null
        }

    },
    updateCategoryByService: async (category_id, categoryData) => {
        try {
            const updateCategory = await categoryModel.findByIdAndUpdate(
                { _id: category_id },
                { $set: categoryData },
                { new: true } // Thêm tùy chọn này để trả về dữ liệu mới
            );
            console.log(">>> check result: ", updateCategory)
            
            return updateCategory
        } catch (error) {
            console.log(">>> check error:", error)
            return null
        }

    },
    deleteCategoryByService: async (category_id) => {
        try {
            const deleteCategory = await categoryModel.findByIdAndDelete(category_id);
            console.log(deleteCategory)

            return deleteCategory
        } catch (error) {
            console.log(">>> check error:", error)
            return null
        }
    },
    getCategoryByIdService: async (category_id) => {
        try {
            const category = await categoryModel.findById(category_id);
            console.log(">>> check result: ", category)

            return category
        } catch (error) {
            console.log(">>> check error:", error)
            return null
        }
    },
    // Hàm mới để kiểm tra file trùng lặp
    checkExistingCategoryFileByRegex: async (fileRegex) => {
        const existingFile = await categoryModel.findOne({
            image: { $regex: fileRegex }
        });
        return existingFile; // Trả về document nếu tìm thấy, hoặc null nếu không
    }
}