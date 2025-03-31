const categoryModel = require("../../models/category.model");
const {
    createNewCategoryService,
    getCategoriesService,
    updateCategoryByService,
    deleteCategoryByService,
    getCategoryByIdService
} = require('../../services/category.service')

const { isValidFileExtension, checkExistingCategoryFile } = require("../../services/file.service")
const { uploadSingleFile } = require('../../services/upload.service')
// const { getFileHash } = require("../services/file.service");
const path = require("path");

const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg"];

module.exports = {
    createCategory: async (req, res) => {
        try {
            const { name, description } = req.body;
            const imgFile = req.files?.image;

            if (!name) {
                return res.status(400).json({ EC: 1, message: "Name is required" });
            }

            if (!imgFile) {
                console.log(">>> No image file detected");
                return res.status(400).json({ EC: 1, message: "Image file is required" });
            }

            // Gọi hàm từ service
            const fileExtension = path.extname(imgFile.name).toLowerCase();
            const isValid = isValidFileExtension(fileExtension);
            console.log("Is valid extension:", isValid);

            if (!isValid) {
                return res.status(400).json({
                    EC: 1,
                    message: `Invalid image format. Only ${ALLOWED_EXTENSIONS.join(", ")} are allowed.`,
                });
            }

            let result = await uploadSingleFile(imgFile);
            console.log(">>>> result :path ", result.path);
            const imageUrl = result.path;

            if (result.status !== "success") {
                return res.status(400).json({
                    EC: 1,
                    message: "Failed to upload image", // Thông báo chính
                    errorDetails: result.error,
                });
            }

            const categoryData = {
                name,
                description,
                image: imageUrl
            }

            const newCategory = await createNewCategoryService(categoryData);

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
            const category = await getCategoriesService();

            // Kiểm tra nếu không có dữ liệu
            if (!category || category.length === 0) {
                return res.status(200).json({
                    EC: 0,
                    message: "No categories found",
                    data: []
                });
            }

            return res.status(200).json({
                EC: 0,
                message: "Category retrieved successfully",
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
            const { name, description } = req.body;

            const existingCategory = await getCategoryByIdService(category_id);
            if (!existingCategory) {
                return res.status(404).json({
                    EC: 1,
                    message: "Category not found"
                });
            }

            let imageUrl = existingCategory.image;

            // Nếu có ảnh mới thì xử lý upload và kiểm tra
            if (req.files && req.files.image) {
                const imgFile = req.files.image;

                const fileExtension = path.extname(imgFile.name).toLowerCase();
                const isValid = isValidFileExtension(fileExtension);
                console.log("Is valid extension:", isValid);
    
                if (!isValid) {
                    return res.status(400).json({
                        EC: 1,
                        message: `Invalid image format. Only ${ALLOWED_EXTENSIONS.join(", ")} are allowed.`,
                    });
                }
    
                // Kiểm tra file ảnh trùng nhau
                const uploadedFileName = imgFile.name;
                const existingFile = await checkExistingCategoryFile(uploadedFileName);
                console.log("existingFile:", existingFile)

                if (!existingFile) {
                    // Upload ảnh mới nếu tên gốc khác
                    const result = await uploadSingleFile(imgFile);
                    console.log(">>>> Đường dẫn ảnh mới: ", result.path);

                    if (result.status !== "success") {
                        return res.status(400).json({
                            EC: 1,
                            message: "Failed to upload image",
                            errorDetails: result.error ? JSON.parse(result.error) : "Unknown error"
                        });
                    }
                    imageUrl = result.path; // Cập nhật ảnh mới
                }
            }

            const categoryData = {
                name,
                description,
                image: imageUrl
            };

            const updateCategory = await updateCategoryByService(category_id, categoryData);

            return res.status(200).json({
                EC: 0,
                message: "Category updated successfully",
                data: updateCategory
            });

        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const category_id = req.params.id;
            console.log(category_id)

            const deleteCategory = await deleteCategoryByService(category_id);
            console.log(deleteCategory)

            if (!deleteCategory) {
                return res.status(404).json({
                    EC: 1,
                    message: "Category not found"
                });
            }

            return res.status(200).json({
                EC: 0,
                message: "Category deleted successfully",
                data: deleteCategory
            });
        } catch (error) {
            console.error(">>> check error:", error);
            return res.status(500).json({ EC: 1, message: "Server error" });
        }
    },

}
