const path = require("path");

module.exports = {
    uploadSingleFile: async (fileObject) => {
        // Xác định thư mục nơi file ảnh sẽ được lưu
        let uploadPath = path.resolve(__dirname, "../public/images/upload");
        console.log(">>> check fileObject: ", path.resolve(__dirname, "../public/images/upload"))

        //get image extension
        let extName = path.extname(fileObject.name)
        console.log(">>> check extName: ", extName)

        //get image's name (without extension)
        let baseName = path.basename(fileObject.name, extName)
        console.log(">>> check baseName: ", baseName)

        //create final path: eg: /upload/your-image.png
        let finalName = `${baseName}-${Date.now()}${extName}`
        let finalPath = path.join(uploadPath, finalName);

        console.log("final name: ", finalName)
        console.log("final path: ", finalPath)

        try {
            await fileObject.mv(finalPath)
            return {
                status: 'success',
                path: finalName,
                error: null
            }
        } catch (error) {
            console.log(">>> check err: ", error)

            return {
                status: 'failed',
                path: null,
                error: JSON.stringify(error)
            }
        }
    },
    uploadMultipleFiles: async (filesArr) => {
        try {
            let uploadPath = path.resolve(__dirname, "../public/images/upload");
            let resultArr = [];
            let countSuccess = 0;
            for (let i = 0; i < filesArr.length; i++) {
                //get image extension
                let extName = path.extname(filesArr[i].name);
                console.log(">>> check extName: ", extName)

                //get image's name (without extension)
                let baseName = path.basename(filesArr[i].name, extName);
                console.log(">>> check baseName: ", baseName)

                //create final path: eg: /upload/your-image.png
                let finalName = `${baseName}-${Date.now()}${extName}`
                let finalPath = `${uploadPath}/${finalName}`;
                console.log("final name: ", finalName)
                console.log("final path: ", finalPath)

                try {
                    await filesArr[i].mv(finalPath);
                    resultArr.push({
                        status: 'success',
                        path: finalName,
                        fileName: filesArr[i].name,
                        error: null
                    })
                    countSuccess++;
                } catch (err) {
                    resultArr.push({
                        status: 'failed',
                        path: null,
                        fileName: filesArr[i].name,
                        error: JSON.stringify(err)
                    })
                }
            }

            return {
                countSuccess: countSuccess,
                detail: resultArr
            }

        } catch (error) {
            console.log(error)
        }

    }

}