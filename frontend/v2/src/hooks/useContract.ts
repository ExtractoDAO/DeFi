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
import { ExtractAbiEventNames } from "abitype"

const useContract = <TContractName extends ContractName>(
    contractName: TContractName
) => {
    const { data: contractData, isLoading } =
        useDeployedContractInfo(contractName)
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
            if (!contract) return
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
        console.log("TESTE: ", args)
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

    const decodeContractDeployedData = async (
        event: ExtractAbiEventNames<ContractAbi<typeof contractName>>
    ): Promise<any> => {
        try {
            if (!contractData) return

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const fragment = contract?.interface.getEvent(event)
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
        decodeContractDeployedData,
        isLoading,
        contractData,
        contract
    }
}

export default useContract
