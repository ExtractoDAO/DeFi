import { ContractInterface, ethers } from "ethers"
import useDeployedContractInfo from "./useDeployedContractInfo"
import {
    Contract,
    ContractAbi,
    ContractName,
    FunctionNamesWithInputs,
    FunctionNamesWithoutInputs,
    contracts
} from "@/utils/contract"
import { useConnectionStatus } from "@thirdweb-dev/react"
import { getParsedEthersError } from "@/utils/utilsContract"
import { useState } from "react"
import env from "@/services/environment"

const useFuture = () => {
    const connectStatus = useConnectionStatus()
    const [hash, setHash] = useState("")

    const chainId = env.CHAIN_ID

    const contractData =
        contracts?.[chainId as number]?.[0]?.contracts?.[
            "Future" as ContractName
        ]

    const getContract = (address: string) => {
        // TODO: Verificar se o contrato "Future" foi deployado
        if (contractData) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            return new ethers.Contract(
                address,
                contractData?.abi as ContractInterface,
                signer
            )
        }
    }

    const read = async (
        address: string,
        functionName: FunctionNamesWithoutInputs<ContractAbi<"Future">>
    ): Promise<ethers.ContractTransaction | any | undefined> => {
        try {
            const contract = getContract(address)
            if (!contract || connectStatus !== "connected") return
            const response = await contract[functionName]()
            return response
        } catch (error) {
            const message = getParsedEthersError(error)
            throw new Error(`${message}`)
        }
    }

    const write = async (
        address: string,
        functionName: FunctionNamesWithInputs<ContractAbi<"Future">>,
        ...args: any[]
    ): Promise<ethers.ContractTransaction | undefined> => {
        try {
            const contract = getContract(address)
            console.log("CONTRATO:  ", contract)
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

    return {
        read,
        write
    }
}

export default useFuture
