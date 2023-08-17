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
import { useContractRead } from "wagmi"

import { FunctionFragment } from "ethers/lib/utils"
import { ethers } from "ethers"

const useContract = <TContractName extends ContractName>(
    contractName: TContractName
) => {
    const { data: contractData } = useDeployedContractInfo(contractName)

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
            const response = contract[functionName]()
            return response
        } catch (error) {
            return error
        }
    }

    const write = async (
        functionName: FunctionNamesWithInputs<ContractAbi<typeof contractName>>,
        inputs: AbiFunctionArguments<ContractAbi, typeof functionName>
    ) => {
        console.log(functionName, inputs)
    }

    return {
        read,
        write
    }
}

export default useContract
