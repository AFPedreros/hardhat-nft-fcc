require("dotenv").config()
const pinataSDK = require("@pinata/sdk")
const fs = require("fs")
const path = require("path")

const pinataApiKey = process.env.PINATA_API_KEY
const pinataApiSecret = process.env.PINATA_API_SECRET
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret)

async function storeImages(imagesFilePath) {
    const fullImagesPath = path.resolve(imagesFilePath)
    const files = fs.readdirSync(fullImagesPath)
    let responses = []
    console.log("Uploading to Pinata!")
    for (fileIndex in files) {
        const readableStreamForFile = fs.createReadStream(
            `${fullImagesPath}/${files[fileIndex]}`
        )
        try {
            const response = await pinata.pinFileToIPFS(readableStreamForFile, {
                pinataMetadata: {
                    name: `${files[fileIndex]}`,
                },
            })
            console.log(response)
            responses.push(response)
        } catch (error) {
            console.log(error)
        }
    }
    return { responses, files }
}

async function storeTokenUriMetadata(metadata) {}

module.exports = { storeImages }
