import {
    ContractAbi,
    ContractName,
    FunctionNamesWithInputs,
    FunctionNamesWithoutInputs
} from "@/utils/contract"
import useDeployedContractInfo from "./useDeployedContractInfo"

import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { getParsedEthersError } from "@/utils/utilsContract"

import abiDecoder from "abi-decoder"
import { useConnectionStatus } from "@thirdweb-dev/react"

const useContract = <TContractName extends ContractName>(
    contractName: TContractName
) => {
    const connectStatus = useConnectionStatus()
    const { data: contractData } = useDeployedContractInfo(contractName)
    const [hash, setHash] = useState("")
    const [contract, setContract] = useState<ethers.Contract>()

    useEffect(() => {
        if (contractData) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()

            setContract(
                new ethers.Contract(
                    contractData.address,
                    contractData.abi,
                    signer
                )
            )
        }
    }, [contractData])

    const read = async (
        functionName: FunctionNamesWithoutInputs<
            ContractAbi<typeof contractName>
        >
    ): Promise<ethers.ContractTransaction | any | undefined> => {
        try {
            if (!contract || connectStatus !== "connected") return
            const response = await contract[functionName]()
            return response
        } catch (error) {
            const message = getParsedEthersError(error)
            throw new Error(`${message}`)
        }
    }

    const write = async (
        functionName: FunctionNamesWithInputs<ContractAbi<typeof contractName>>,
        ...args: any[]
    ): Promise<ethers.ContractTransaction | undefined> => {
        try {
            if (!contract) return

            const txn: ethers.ContractTransaction = await contract[
                functionName
            ](...args)
            setHash(txn.hash)
            await txn.wait(1)
            return txn
        } catch (error) {
            const message = getParsedEthersError(error)
            throw new Error(`${message}`)
        }
    }

    const decodeTransactionData = (data: string) => {
        if (!contractData) return
        abiDecoder.addABI(contractData.abi)
        const decodedData = abiDecoder.decodeMethod(data)
        return decodedData
    }

    const decodeContractDeployedData = async (
        tx: ethers.ContractTransaction
    ): Promise<any> => {
        try {
            if (!contractData) return

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const fragment = contract?.interface.getEvent("FutureCreated")
            const emptyIface = new ethers.utils.Interface([])

            if (!fragment) return

            const topicHash = emptyIface.getEventTopic(fragment)
            const topics = [topicHash] as any[]

            const logs = await provider.getLogs({
                address: contractData?.address,
                topics: topics
            })
            const newEvents = []
            for (let i = logs.length - 1; i >= 0; i--) {
                let block
                let transaction
                let receipt

                const log = {
                    log: logs[i],
                    args: contract?.interface.parseLog(logs[i]).args,
                    block: block,
                    transaction: transaction,
                    receipt: receipt
                }
                newEvents.push(log)
            }

            const response = newEvents[0].args
            return response
        } catch (err) {
            console.log("ERROR in decode ", err)
        }
    }

    return {
        read,
        write,
        hash,
        contractAddress: contractData?.address,
        decodeContractDeployedData
    }
}

export default useContract
