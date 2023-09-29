"use client"

import { useEffect, useState } from "react"

import useContract from "./useContract"
import { ContractName } from "@/utils/contract"
import useDeployedContractInfo from "./useDeployedContractInfo"
import { useDexContext } from "@/context"
import { toast } from "react-toastify"
import { ethers } from "ethers"

interface IBuyOrder {
    tokenAddress: string
    commodityAmount: number
    amount: number
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
    const { read, write, hash, contractAddress, contract } = useContract("Dex")
    const [buyOrders, setBuyOrders] = useState<IOrder[]>([])
    const [sellOrders, setSellOrders] = useState<IOrder[]>([])
    const [loading, setLoading] = useState(false)
    const [tokenName, setTokenName] = useState("")
    const [modal, setModal] = useState("")

    const { data: contractData } = useDeployedContractInfo(
        tokenName as ContractName
    )

    const { read: readToken, write: tokenInteraction } = useContract(
        tokenName as ContractName
    )

    useEffect(() => {
        setTokenName(selectedToken.split("-")[1].toUpperCase())
    }, [selectedToken])

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
            .then(() => {
                setModal("")
                fetchOrders()
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

    async function handleApprove(price: string) {
        setModal("approving")
        const decimals = await readToken("decimals")
        const formattedValue = ethers.utils.parseUnits(price, Number(decimals))

        if (!contractData?.address || !formattedValue) return
        try {
            await tokenInteraction("approve", contractAddress, formattedValue)
            setModal("confirm")
        } catch (e) {
            toast.error(`Failed to approve: ${e}`)
            setModal("")
        }
    }

    const handlePlaceOrder = async (price: number, commodityAmount: number) => {
        if (!contractData) return

        await placeBuyOrder({
            tokenAddress: contractData?.address,
            amount: price * 10 ** 18,
            commodityAmount: commodityAmount * 10 ** 18,
            randNonce: Math.floor(Math.random() * 4096) + 1
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
        handlePlaceOrder,
        hash
    }
}

export default useExchange
