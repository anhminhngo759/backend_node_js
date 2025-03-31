const path = require("path");
const { checkExistingCategoryFileByRegex } = require('../services/category.service');
const { checkExistingProductFileByRegex } = require('../services/product.service')
const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg"];

module.exports = {
    isValidFileExtension: (filename) => {
        const fileExtension = path.extname(filename).toLowerCase();
        return ALLOWED_EXTENSIONS.includes(fileExtension);
    },
    // Hàm mới để kiểm tra file trùng lặp
    checkExistingCategoryFile: async (fileName) => {
        const baseName = path.parse(fileName).name; // Lấy phần tên không có đuôi
        const fileRegex = new RegExp(`^${baseName}.*$`);

        const existingFile = await checkExistingCategoryFileByRegex(fileRegex);

        return existingFile; // Trả về document nếu tìm thấy, hoặc null nếu không
    },

    // Hàm mới để kiểm tra file trùng lặp
    checkExistingProductFile: async (fileNames) => {
        const duplicateFiles = [];
        for (const fileName of fileNames) {
            const baseName = path.parse(fileName).name; // Lấy tên file không có đuôi
            const fileRegex = new RegExp(`^${baseName}.*$`);

            const existingFile = await checkExistingProductFileByRegex(fileRegex);
            console.log("existing Product File: ", existingFile)

            if (existingFile) {
                duplicateFiles.push(...existingFile.images);
            }
        }

        console.log("duplicateFiles: ", duplicateFiles)
        return duplicateFiles.length > 0 ? duplicateFiles : null;
    },
};


