import localhost from "./chain/localhost"
import testnet from "./chain/testnet"
import mainnet from "./chain/mainnet"

type Network = "localhost" | "testnet" | "mainnet"

export const network: Network = process.env.NETWORK as Network

const config = {
    localhost,
    testnet,
    mainnet
}

const settings = {
    contractAddress: config[network].DAO_ADDRESS,
    whiteList: config[network].WHITELIST,
    provider: config[network].PROVIDER,
    getTokens: config[network].TOKENS,
    txScan: config[network].TX_SCAN
}
export default settings
