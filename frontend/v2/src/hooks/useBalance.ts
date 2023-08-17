import { ethers } from "ethers"
import useDeployedContractInfo from "./useDeployedContractInfo"

import { ContractName } from "@/utils/contract"

import WalletConnectProvider from "@walletconnect/web3-provider"

const useBalance = <TContractName extends ContractName>(
    contractName: TContractName
) => {
    const { data: contractData } = useDeployedContractInfo(contractName)

    const fetchBalance = async (account: `0x${string}`) => {
        if (!window.ethereum) return
        if (!account) return
        if (!contractData) return

        const tokenAbi = contractData.abi
        const tokenAddress = contractData.address

        const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum || (window as any).web3.currentProvider
        )

        const tokenContract = new ethers.Contract(
            tokenAddress,
            tokenAbi,
            provider
        )

        const userBalance = await tokenContract.balanceOf(account)

        return userBalance
    }

    return {
        fetchBalance
    }
}

export default useBalance
