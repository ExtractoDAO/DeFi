import DaoABI from "utils/contracts/Commodity.sol/Commodity.json"
import FutureABI from "utils/contracts/Future.sol/Future.json"
import Erc20ABI from "utils/contracts/ERC20.sol/ERC20.json"

import { firebaseLogin } from "services/firebase/contracts"
import logger from "../services/logs/log"
import settings from "config/settings"
import abiDecoder from "abi-decoder"
import { useState } from "react"
import { BigNumber, ethers } from "ethers"

const { contractAddress: daoAddress } = settings

export type InstanceType = "dao" | "future"

type DAOFunctions = keyof typeof DaoABI.methodIdentifiers
export type FutureFunctions = keyof typeof FutureABI.methodIdentifiers

const useContract = () => {
    const [loading, setLoading] = useState(false)
    const [deployingHash, setDeployingHash] = useState("")

    const contractConfig = (
        instanceType: InstanceType,
        contractAddress?: string
    ) => {
        if (instanceType === "dao") {
            return {
                address: daoAddress,
                contractAbi: DaoABI
            }
        } else {
            if (!contractAddress) throw new Error("Contract address required")

            const configs = {
                future: {
                    address: contractAddress,
                    contractAbi: FutureABI
                }
            }

            return configs[instanceType]
        }
    }

    const contractInstance = (
        instanceType: InstanceType,
        contractAddress?: string
    ) => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(
                window.ethereum as any
            )
            const signer = provider.getSigner()

            const selectedConfig = contractConfig(instanceType, contractAddress)

            const contract = new ethers.Contract(
                selectedConfig.address,
                selectedConfig.contractAbi.abi,
                signer
            )

            return contract
        }
    }

    const execFunction = async (
        functionConfig: {
            instanceType: InstanceType
            contractAddress?: string
            functionName: DAOFunctions | FutureFunctions
            onFinish?: () => void
        },
        ...args: any[]
    ) => {
        setLoading(true)

        firebaseLogin()

        const { functionName, instanceType, contractAddress, onFinish } =
            functionConfig
        const cleanFuncName = functionName.split("(")[0]
        const contract = contractInstance(instanceType, contractAddress)

        if (!contract) return

        let txn
        try {
            if (args.length) {
                txn = await contract[cleanFuncName](...args)

                setDeployingHash(txn.hash)

                console.log("⏰ Mining... See your transactions")
                logger.tx(txn.hash)
                await txn.wait(1)
                console.log("✅ Mined")
                logger.tx(txn.hash)
            } else {
                txn = await contract[functionName]()
            }

            if (onFinish) {
                onFinish()
            }

            setLoading(false)
            return txn
        } catch (error) {
            console.error(error)
            setLoading(false)
            alert(
                `Error while executing function: ${functionName};
                Params: ${args};
                Error: ${error}
                `
            )

            return
        }
    }

    const getTokenDecimals = async (erc20: string) => {
        const provider = new ethers.providers.Web3Provider(
            window?.ethereum as any
        )

        const tokens: Dictionary = settings.getTokens

        const signer = provider.getSigner()

        const erc20Contract = new ethers.Contract(
            tokens[erc20],
            Erc20ABI.abi,
            signer
        )

        try {
            const decimals = await erc20Contract.decimals()
            return Number(decimals)
        } catch (error) {
            throw new Error("Failed get decimals")
        }
    }

    const approveTransaction = async (erc20: string, value: BigNumber) => {
        const provider = new ethers.providers.Web3Provider(
            window?.ethereum as any
        )

        const tokens: Dictionary = settings.getTokens

        const signer = provider.getSigner()

        const erc20Contract = new ethers.Contract(
            tokens[erc20],
            Erc20ABI.abi,
            signer
        )

        try {
            await erc20Contract.approve(daoAddress, value)

            return true
        } catch (error) {
            console.log("ERROR: ", error)
            return false
        }
    }

    const decodeTransactionData = (data: string) => {
        abiDecoder.addABI(DaoABI.abi)

        const decodedData = abiDecoder.decodeMethod(data)

        return decodedData
    }

    return {
        contractInstance,
        execFunction,
        getTokenDecimals,
        loading,
        deployingHash,
        approveTransaction,
        decodeTransactionData
    }
}

export default useContract
