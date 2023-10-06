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
    commodityAmount: number
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
            commodityAmount,
            amount,
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
        amount: number
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
        const formattedValue = toFixed(Number(price) * 10e18)

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

        const decimals = await readToken("decimals")
        const formattedPrice = toFixed(price * 10e18)

        console.log(formattedPrice)

        await placeBuyOrder({
            tokenAddress: contractData?.address,
            amount: formattedPrice,
            commodityAmount: commodityAmount,
            randNonce: Math.floor(Math.random() * 4096) + 1
        })
    }

    function toFixed(x: any) {
        if (Math.abs(x) < 1.0) {
            var e = parseInt(x.toString().split("e-")[1])
            if (e) {
                x *= Math.pow(10, e - 1)
                x = "0." + new Array(e).join("0") + x.toString().substring(2)
            }
        } else {
            var e = parseInt(x.toString().split("+")[1])
            if (e > 20) {
                e -= 20
                x /= Math.pow(10, e)
                x += new Array(e + 1).join("0")
            }
        }
        return x
    }

    const handlePlaceSellOrder = async (address: string, price: number) => {
        const formattedValue = ethers.utils.parseUnits(price.toString(), 18)
        console.log("AQUIII ", toFixed(price * 10e18))

        await placeSellOrder({
            address,
            amount: toFixed(price * 10e18)
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
