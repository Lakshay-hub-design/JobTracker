const { ImageKit } = require('@imagekit/nodejs')

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file){
    const response = await imageKit.files.upload({
        file : file.buffer.toString("base64"),
        fileName: file.originalname,
        folder: '/resumes'
    })

    return {
        url: response.url,
        fileId: response.fileId,
        name: response.name,
        uploadedAt: new Date(),
        size: response.size
    }
}

module.exports = uploadFile