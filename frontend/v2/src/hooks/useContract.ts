import {
    AbiFunctionArguments,
    AbiFunctionInputs,
    Contract,
    ContractAbi,
    ContractCodeStatus,
    ContractName,
    FunctionNamesWithInputs,
    FunctionNamesWithoutInputs,
    contracts
} from "@/utils/contract"
import useDeployedContractInfo from "./useDeployedContractInfo"

import { ethers } from "ethers"
import { useState } from "react"
import { getParsedEthersError } from "@/utils/utilsContract"

const useContract = <TContractName extends ContractName>(
    contractName: TContractName
) => {
    const { data: contractData } = useDeployedContractInfo(contractName)
    const [hash, setHash] = useState("")

    const read = async (
        functionName: FunctionNamesWithoutInputs<
            ContractAbi<typeof contractName>
        >
    ) => {
        if (!window.ethereum) return
        if (!contractData) return

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const contract = new ethers.Contract(
            contractData.address,
            contractData.abi,
            signer
        )

        try {
            const response = await contract[functionName]()
            return response
        } catch (error) {
            return error
        }
    }

    const write = async (
        functionName: FunctionNamesWithInputs<ContractAbi<typeof contractName>>,
        ...args: any[]
    ) =>
        // args: AbiFunctionArguments<ContractAbi, typeof functionName>
        {
            if (!window.ethereum) return
            if (!contractData) return

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()

            const contract = new ethers.Contract(
                contractData.address,
                contractData.abi,
                signer
            )

            try {
                const txn = await contract[functionName](...args)
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
        write,
        hash,
        contractAddress: contractData?.address
    }
}

export default useContract
