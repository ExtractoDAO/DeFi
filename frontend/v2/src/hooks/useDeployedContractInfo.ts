import {
    Contract,
    ContractCodeStatus,
    ContractName,
    contracts
} from "@/utils/contract"
import { ethers } from "ethers"

import { useEffect, useState } from "react"
import { useIsMounted } from "usehooks-ts"

const chainId = process.env.CHAIN_ID || 31337

const useDeployedContractInfo = <TContractName extends ContractName>(
    contractName: TContractName
) => {
    const isMounted = useIsMounted()
    const deployedContract = contracts?.[chainId as number]?.[0]?.contracts?.[
        contractName as ContractName
    ] as Contract<TContractName>
    const [status, setStatus] = useState<ContractCodeStatus>(
        ContractCodeStatus.LOADING
    )
    const provider = new ethers.providers.JsonRpcProvider()

    useEffect(() => {
        const checkContractDeployment = async () => {
            if (!deployedContract) {
                setStatus(ContractCodeStatus.NOT_FOUND)
                return
            }
            const code = await provider.getCode(
                (deployedContract as Contract<any>).address
            )

            if (!isMounted()) {
                return
            }
            // If contract code is `0x` => no contract deployed on that address
            if (code === "0x") {
                setStatus(ContractCodeStatus.NOT_FOUND)
                return
            }
            setStatus(ContractCodeStatus.DEPLOYED)
        }

        checkContractDeployment()
    }, [isMounted, contractName, deployedContract, provider])

    return {
        data:
            status === ContractCodeStatus.DEPLOYED
                ? deployedContract
                : undefined,
        isLoading: status === ContractCodeStatus.LOADING
    }
}

export default useDeployedContractInfo
