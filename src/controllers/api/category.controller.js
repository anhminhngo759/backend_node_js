const categoryModel = require('../../models/category.model');

module.exports = {
    createCategory: async (req, res) => {
        try {
            const body = req.body;

            const newCategory = await categoryModel.create({ body });

            return res.status(201).json({
                EC: 0,
                message: "Category created successfully",
                data: newCategory
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },
    getCategories: async (req, res) => {
        try {
            const category = await categoryModel.find();

            return res.status(200).json({
                EC: 0,
                message: "Category got successfully",
                data: category
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const category_id = req.params.id;
            const body = req.body;

            const updatedcategory = await categoryModel.findByIdAndUpdate({ _id: category_id }, { $set: body });

            return res.status(200).json({
                EC: 0,
                message: "Category updated successfully",
                data: updatedcategory
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const category_id = req.params.id;

            const deletedCategory = await findByIdAndDelete(category_id);

            return res.status(200).json({
                EC: 0,
                message: "Category deleted successfully",
                data: deletedCategory
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    }
}