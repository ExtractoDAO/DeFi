import { useState, useEffect } from "react"
import useContract from "@/hooks/useContract"
import useBalance from "@/hooks/useBalance"

import { ethers } from "ethers"

import { toast } from "react-toastify"
import { Token, tokens } from "@/components/tokenSelector"
import { useAddress } from "@thirdweb-dev/react"

import { Backend } from "@/services/backend/backend"
import env from "@/services/environment"
import AxiosService from "@/services/axios"

const backend = new Backend(env, new AxiosService(env))

const useContractBuy = () => {
    const { read, write, contractAddress, hash, decodeContractDeployedData } =
        useContract("Commodity")
    const [modal, setModal] = useState("")
    const [price, setPrice] = useState<any>(0)
    const address = useAddress() as `0x${string}`
    const [selectedToken, setSelectedToken] = useState<Token>({} as Token)
    const { fetchBalance } = useBalance(selectedToken.symbol)
    const [userBalance, setUserBalance] = useState(0)
    const [usdValue, setUsdValue] = useState("")
    const [kgAmount, setKgAmount] = useState("")

    const {
        read: readToken,
        contractAddress: tokenAddress,
        write: tokenInteraction
    } = useContract(selectedToken.symbol)

    useEffect(() => {
        setSelectedToken(tokens[0])
    }, [])

    useEffect(() => {
        async function getBalance() {
            if (address) {
                const res = await fetchBalance(address)
                const decimals = await readToken("decimals")

                const response = Number(res) / 10 ** decimals
                if (typeof response === "number") {
                    setUserBalance(response)
                }
            }
        }

        getBalance()
    }, [address, selectedToken, readToken])

    useEffect(() => {
        async function getBuyPrice() {
            const res = await read("getBuyPrice")
            setPrice(Number(res) / 10 ** 18)
        }

        getBuyPrice()
    }, [address, read])

    function updateAmount(numberValue: number) {
        setKgAmount((numberValue / price).toFixed(2).toString())
    }

    function updateValue(numberAmount: number) {
        setUsdValue(Math.ceil(numberAmount * price).toString())
    }

    async function handleApprove() {
        if (Number(usdValue) < 10) {
            toast.error("Value in USD must be greather than U$ 10")
            return
        }
        setModal("approving")

        const decimals = await readToken("decimals")

        const formattedValue = ethers.utils.parseUnits(
            usdValue,
            Number(decimals)
        )

        if (!contractAddress || !formattedValue) return

        try {
            await tokenInteraction("approve", contractAddress, formattedValue)

            setModal("confirm")
        } catch (e) {
            toast.error(`Failed to approve: ${e}`)
            setModal("")
        }
    }

    async function handleDeploy() {
        setModal("loading")
        const decimals = await readToken("decimals")
        const formattedValue = ethers.utils.parseUnits(
            usdValue,
            Number(decimals)
        )

        try {
            const response = await write(
                "createFuture",
                tokenAddress,
                formattedValue,
                {
                    gasLimit: 10000000
                }
            )

            if (!response) {
                return
            }

            // backend.graphql.addContract({
            //     address
            // })

            const decodedResponse = await decodeContractDeployedData(response)
            console.log("RESPONSE ", decodedResponse)

            setModal("success")
        } catch (e: any) {
            toast.error(e)
            setModal("confirm")
        }
    }

    return {
        modal,
        setModal,
        usdValue,
        setUsdValue,
        kgAmount,
        setKgAmount,
        selectedToken,
        setSelectedToken,
        handleApprove,
        handleDeploy,
        updateAmount,
        updateValue,
        hash,
        userBalance,
        price
    }
}

export default useContractBuy
