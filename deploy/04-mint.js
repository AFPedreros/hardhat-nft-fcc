const { ethers, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deployer } = await getNamedAccounts()

    // Basic NFT
    const basicNft = await ethers.getContract("BasicNFT", deployer)
    const basicMintTx = await basicNft.mintNft()
    await basicMintTx.wait(1)
    console.log(`Basic NFT index 0 has tokenURI: ${await basicNft.tokenURI(0)}`)

    // Random IPFS NFT
    const randomIpfsNft = await ethers.getContract("RandomIpfsNFT", deployer)
    const mintFee = await randomIpfsNft.getMintFee()
    // const randomMintTx = await randomIpfsNft.requestNFT({
    //     value: mintFee.toString(),
    // })
    // const randomMintTxReceipt = await randomMintTx.wait(1)
    // Need to listen for response
    // await new Promise(async (resolve, reject) => {
    //     setTimeout(
    //         () => reject("Timeout: 'NftMinted' event did not fire"),
    //         300000 // 5 minute timeout time
    //     )
    //     // setup listener for our event
    //     randomIpfsNft.once("NftMinted", async () => {
    //         resolve()
    //     })
    //     if (developmentChains.includes(network.name)) {
    //         const requestId =
    //             randomMintTxReceipt.events[1].args.requestId.toString()
    //         const vrfCoordinatorV2Mock = await ethers.getContract(
    //             "VRFCoordinatorV2Mock",
    //             deployer
    //         )
    //         await vrfCoordinatorV2Mock.fulfillRandomWords(
    //             requestId,
    //             randomIpfsNft.address
    //         )
    //     }
    // })
    // console.log(
    //     `Random IPFS NFT index 0 has tokenURI: ${await randomIpfsNft.tokenURI(
    //         0
    //     )}`
    // )

    // Dynamic SVG NFT
    const highValue = ethers.utils.parseEther("1250")
    const dynamicNft = await ethers.getContract("DynamicSvgNFT", deployer)
    const dynamicMintTx = await dynamicNft.mintNFT(highValue.toString())
    await dynamicMintTx.wait(1)
    console.log(
        `Dynamic SVG NFT index 0 has tokenURI: ${await dynamicNft.tokenURI(0)}`
    )
}
