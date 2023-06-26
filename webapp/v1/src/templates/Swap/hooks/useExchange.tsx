import { ethers } from "ethers"
import useContract from "hooks/useContract"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAccount } from "wagmi"

import settings from "config/settings"

import { FutureContract } from "types/DAO"

import { firebaseLogin } from "services/firebase/contracts"
import { onValue, ref } from "firebase/database"
import { network } from "config/settings"

export interface Order {
    "0": { type: string; hex: string }
    "1": { type: string; hex: string }
    "2": string
    "3": string
    "4": string
    "5": number
    commodityAmount: { type: string; hex: string }
    amount: { type: "string"; hex: "string" }
    tokenAddress: string
    future: string
    investor: string
    typed: number
}

/**
 * @param tokenAddress Approved token 💵
 * @param commodityAmount How much commodity (Kg for example) you want to buy ⚖
 * @param amount How much value (in dollars of the approved token) you want to pay 💲
 */
export interface IOrder {
    tokenAddress: `0x${string}`
    commodityAmount: number
    amount: number
}

interface IObj {
    [key: string]: string
}

const tokens: IObj = settings.getTokens

type BuyStatus = "waiting" | "ok" | "loading" | "error"

import { database } from "services/firebase"
const db = database

const useExchange = () => {
    const { address: account } = useAccount()
    const { getTokenDecimals, approveTransaction, execFunction } = useContract()
    const [isConfirmed, setIsConfirmed] = useState<BuyStatus>("waiting")
    const [isApproved, setIsApproved] = useState<BuyStatus>("waiting")
    const [loading, setLoading] = useState(false)
    const [fullDrawer, setFullDrawer] = useState<FutureContract[] | null>(null)

    const [buyOrders, setBuyOrders] = useState<Order[]>([])

    const getOrders = async () => {
        const response = await execFunction({
            instanceType: "dao",
            functionName: "buyOrders()"
        })

        const sellOrders = await execFunction({
            instanceType: "dao",
            functionName: "sellOrders()"
        })

        console.log("SELL ORDERS ", sellOrders)

        setBuyOrders(response.map((item: any) => Object.assign({}, item)))
    }

    const handleApprove = async (
        selectedPaymentMethod: string,
        value: string
    ) => {
        if (!account) {
            return
        }

        const decimals = await getTokenDecimals(selectedPaymentMethod)
        const formattedValue = ethers.utils.parseUnits(value, Number(decimals))

        const approve = await approveTransaction(
            selectedPaymentMethod,
            formattedValue
        )

        if (!approve) {
            setIsApproved("error")

            toast.error(
                `Error in contract purchase. Make sure you have enought ${selectedPaymentMethod} to buy contract.`,
                {
                    position: "top-center",
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                }
            )

            return
        } else {
            setIsApproved("ok")
        }
    }

    const placeBuyOrder = async (
        selectedPaymentMethod: string,
        value: string,
        amount: number
    ) => {
        if (loading) {
            return
        }

        const decimals = await getTokenDecimals(selectedPaymentMethod)
        const formattedValue = ethers.utils.parseUnits(value, Number(decimals))

        const tx = await execFunction(
            {
                instanceType: "dao",
                functionName: "buyOrder(address,uint256,uint256)"
            },
            tokens[selectedPaymentMethod],
            amount,
            formattedValue,
            {
                gasLimit: 10000000
            }
        )

        if (!tx) {
            setIsConfirmed("error")

            toast.error(
                `Error in contract purchase. Make sure you have enought ${selectedPaymentMethod} to buy contract and MATIC to pay network GAS`,
                {
                    position: "top-center",
                    closeOnClick: true,
                    autoClose: false,
                    draggable: true,
                    theme: "colored"
                }
            )

            return
        }

        setIsConfirmed("ok")
    }

    const placeSellOrder = async (
        investor: `0x${string}`,
        futureAddress: string,
        commodityAmount: string,
        value: string
    ) => {
        if (loading) {
            return
        }

        if (!account) {
            return
        }

        console.log(investor, futureAddress, commodityAmount, value)

        const formattedValue = ethers.utils.parseUnits(value, 18)

        const tx = await execFunction(
            {
                instanceType: "future",
                contractAddress: futureAddress,
                functionName: "sellOrder(address,uint256,uint256)"
            },
            investor,
            commodityAmount,
            formattedValue,
            {
                gasLimit: 10000000
            }
        )

        if (!tx) {
            setIsConfirmed("error")

            toast.error(
                "Error in sell order. Make sure you have enought MATIC to pay network GAS",
                {
                    position: "top-center",
                    closeOnClick: true,
                    autoClose: 10000,
                    draggable: true,
                    theme: "colored"
                }
            )

            return
        }
    }

    const getContracts = async () => {
        if (!account) {
            return
        }
        try {
            firebaseLogin()
            onValue(ref(db, `${network}-drawer`), (snapshot) => {
                if (snapshot.val()) {
                    const res: FutureContract[] = Object.values(snapshot.val())

                    if (res.length) {
                        const arr = res
                            .filter(
                                (item) =>
                                    BigInt(item?.investor) === BigInt(account)
                            )
                            .filter((item) => !item.withdrawn)
                        setFullDrawer(arr)
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        handleApprove,
        placeBuyOrder,
        isApproved,
        isConfirmed,
        loading,
        getOrders,
        buyOrders,
        setIsConfirmed,
        setIsApproved,
        placeSellOrder,
        getContracts,
        fullDrawer
    }
}

export default useExchange
