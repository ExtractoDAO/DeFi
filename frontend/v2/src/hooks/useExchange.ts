"use client"

import { useEffect, useState } from "react"

import useContract from "./useContract"
import { ContractName } from "@/utils/contract"
import useDeployedContractInfo from "./useDeployedContractInfo"
import { useDexContext } from "@/context"
import { toast } from "react-toastify"
import { BigNumber, ethers } from "ethers"
import useFuture from "./useFuture"

interface IBuyOrder {
    tokenAddress: string
    commodityAmount: BigNumber
    amount: BigNumber
    randNonce: number
}

export interface IOrder {
    id: string
    price: number
    amount: number
    tokenAddress?: string
}

const useExchange = () => {
    const { selectedToken } = useDexContext()
    const { write: futureWrite } = useFuture()
    const {
        read,
        write,
        hash,
        contractAddress,
        contract,
        decodeContractDeployedData
    } = useContract("Dex")
    const { read: readCommodity, contract: contractCommodity } =
        useContract("Commodity")
    const [buyOrders, setBuyOrders] = useState<IOrder[]>([])
    const [sellOrders, setSellOrders] = useState<IOrder[]>([])
    const [loading, setLoading] = useState(false)
    const [tokenName, setTokenName] = useState("")
    const [modal, setModal] = useState("")
    const [userContractList, setUserContractList] = useState([])

    const multiplyBy1e18 = (value: number) =>
        ethers.utils.parseEther(value.toString())

    const { data: contractData } = useDeployedContractInfo(
        tokenName as ContractName
    )

    const { read: readToken, write: tokenInteraction } = useContract(
        tokenName as ContractName
    )

    useEffect(() => {
        setTokenName(selectedToken.split("-")[1].toUpperCase())
    }, [selectedToken])

    const getUserContracts = async () => {
        const response = await readCommodity("getFullDrawer")
        setUserContractList(response)
    }

    const fetchOrders = async () => {
        setLoading(true)
        await Promise.all([await read("buyOrders"), await read("sellOrders")])
            .then(([buy, sell]) => {
                if (buy) {
                    setBuyOrders(
                        buy.map((e: any) => {
                            return {
                                price: Number(e.amount),
                                amount: Number(e.commodityAmount),
                                tokenAddress: e.tokenAddress,
                                id: e.id
                            }
                        })
                    )
                }
                if (sell) {
                    setSellOrders(
                        sell.map((e: any) => {
                            return {
                                price: Number(e.amount),
                                amount: Number(e.commodityAmount),
                                id: e.id
                            }
                        })
                    )
                }

                setLoading(false)
            })
            .catch((e) => {
                console.log("Error loading orders ", e)
                setLoading(false)
            })
    }

    const placeBuyOrder = async ({
        tokenAddress,
        commodityAmount,
        amount,
        randNonce
    }: IBuyOrder) => {
        await write(
            "buyOrder",
            tokenAddress,
            commodityAmount.toString(),
            amount.toString(),
            randNonce,
            {
                gasLimit: 10000000
            }
        )
            .then(async () => {
                const response = await decodeContractDeployedData("BuyOrder")
                console.log("DECODED: ", response)

                setModal("")
                await fetchOrders()
            })
            .catch((e) => {
                toast(e, {
                    type: "error"
                })
            })
    }

    const placeSellOrder = async ({
        address,
        amount
    }: {
        address: string
        amount: BigNumber
    }) => {
        console.log(amount.toString())
        await futureWrite(address, "sell", amount.toString(), {
            gasLimit: 10000000
        })
            .then(async (res) => {
                console.log("RESPOSTA: ", res)
                // const response = await decodeContractDeployedData("SellOrder")
                // console.log("DECODED 0: ", response)

                setModal("")
                await fetchOrders()
            })
            .catch((e) => {
                toast(e, {
                    type: "error"
                })
            })
    }

    useEffect(() => {
        if (contract) {
            fetchOrders()
        }
    }, [contract])

    useEffect(() => {
        if (contractCommodity) {
            getUserContracts()
        }
    }, [contractCommodity])

    async function handleApprove(price: string) {
        setModal("approving")

        const decimals = await readToken("decimals")
        const formattedValue = ethers.utils.parseUnits(price, decimals)

        if (!contractData?.address || !formattedValue) return
        try {
            await tokenInteraction("approve", contractAddress, formattedValue)
            setModal("confirm")
        } catch (e) {
            toast.error(`Failed to approve: ${e}`)
            setModal("")
        }
    }

    const handlePlaceBuyOrder = async (
        price: number,
        commodityAmount: number
    ) => {
        if (!contractData) return

        const formattedPrice = ethers.utils.parseUnits(price.toString(), 18)
        const formattedAmount = ethers.utils.parseUnits(
            commodityAmount.toString(),
            20
        )

        await placeBuyOrder({
            tokenAddress: contractData?.address,
            amount: formattedPrice,
            commodityAmount: formattedAmount,
            randNonce: Math.floor(Math.random() * 4096) + 1
        })
    }

    const handlePlaceSellOrder = async (address: string, price: number) => {
        await placeSellOrder({
            address,
            amount: ethers.utils.parseUnits(price.toString(), 18)
        })
    }

    return {
        buyOrders,
        sellOrders,
        placeBuyOrder,
        loading,
        modal,
        setModal,
        tokenName,
        handleApprove,
        handlePlaceBuyOrder,
        handlePlaceSellOrder,
        hash,
        userContractList
    }
}

export default useExchange
