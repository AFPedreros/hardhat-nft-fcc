const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { storeImages } = require("../utils/uploadToPinata")

const imagesLocation = "./images/randomNFT"

const metadataTemplate = {
    name: "",
    description: "",
    image: "",
    attributes: [
        {
            trait_types: "Cuteness",
            value: 100,
        },
    ],
}

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let tokenUris

    // Get the IPFS hashes of our images

    if (process.env.UPLOAD_TO_PINATA == true) {
        tokenUris = await handleTokenUris()
    }

    let vrfCoordinatorV2Address, subscriptionId

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract(
            "VRFCoordinatorV2Mock"
        )
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const tx = await vrfCoordinatorV2Mock.createSubscription()
        const transactionReceipt = await tx.wait(1)
        subscriptionId = transactionReceipt.events[0].args.subId
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2
        subscriptionId = networkConfig[chainId].subscriptionId
    }

    log("----------------------------------------------------------")
    await storeImages(imagesLocation)
    // const args = [
    //     vrfCoordinatorV2Address,
    //     subscriptionId,
    //     networkConfig[chainId].gasLane,
    //     networkConfig[chainId].callbackGasLimit,
    //     // tokenUris
    //     networkConfig[chainId].mintFee,
    // ]
}

async function handleTokenUris() {
    let tokenUris = []

    return tokenUris
}

module.exports.tags = ["all", "randomipfs", "main"]
