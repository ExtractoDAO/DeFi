"use client"

import { useState } from "react"
import Button from "@/components/button"
import TextInput from "@/components/textInput"
import classNames from "classnames"
import SelectContract from "./SelectContract"
import useExchange from "@/hooks/useExchange"

import ModalLoading from "@/components/buy/modalLoading"
import ModalSuccess from "@/components/buy/modalSuccess"
import Modal from "@/components/modal"
import { ShoppingCartIcon } from "@heroicons/react/20/solid"

export default function PlaceOrder() {
    const {
        handleApprove,
        handlePlaceBuyOrder,
        handlePlaceSellOrder,
        modal,
        setModal,
        tokenName,
        hash,
        userContractList
    } = useExchange()

    const [buyState, setBuyState] = useState({
        commodityAmount: 0,
        price: 0
    })

    const [sellState, setSellState] = useState({
        selectedContract: "",
        price: 0
    })

    const box = classNames({
        "bg-white dark:bg-deep-gray/100": true,
        "rounded-md": true,
        "w-full": true,
        "p-4": true,
        "shadow-sm": true,
        border: true,
        "border-solid": true,
        "border-gray/200 dark:border-gray/600": true
    })

    return (
        <>
            <ModalLoading
                open={modal === "loading" || modal === "approving"}
                message={
                    modal === "loading"
                        ? {
                              "line-1": "Wait for confirmation...",
                              "line-2": `${buyState.price} USDT for ${buyState.commodityAmount} Kg.`,
                              "line-3": "Confirm the transaction in your wallet"
                          }
                        : {
                              "line-1": "Wait for approval...",
                              "line-2": `${buyState.price} USDT for ${buyState.commodityAmount} Kg.`,
                              "line-3": `You must approve the ${tokenName} spending in your wallet.`
                          }
                }
            />
            <ModalSuccess
                open={modal === "success"}
                handleClose={() => {
                    setModal("")
                    window.open(`https://polygonscan.com/tx/${hash}`, "_blank")
                }}
            />
            <Modal
                open={modal === "confirm"}
                title="Confirm your purchase"
                message="Your purchase is being processed. Confirm to continue."
                icon={
                    <ShoppingCartIcon className="text-brand/secondary/500 dark:text-brand/primary/500" />
                }
                buttons={[
                    {
                        label: "Confirm",
                        onClick: () =>
                            handlePlaceBuyOrder(
                                buyState.price,
                                buyState.commodityAmount
                            )
                    },
                    {
                        label: "Cancel",
                        onClick: () => setModal(""),
                        bgColor: "secondary"
                    }
                ]}
            />

            <div className="col-12 lg:col-6">
                <div className={box}>
                    <TextInput
                        label="Commodity amount"
                        type="number"
                        value={
                            buyState.commodityAmount > 0
                                ? buyState.commodityAmount
                                : ""
                        }
                        onChange={({ target }) =>
                            setBuyState({
                                ...buyState,
                                commodityAmount: Number(target.value)
                            })
                        }
                    />
                    <TextInput
                        label="Price"
                        type="number"
                        value={buyState.price > 0 ? buyState.price : ""}
                        onChange={({ target }) =>
                            setBuyState({
                                ...buyState,
                                price: Number(target.value)
                            })
                        }
                    />
                    <div className="mt-5">
                        <Button
                            bgColor="success"
                            onClick={() =>
                                handleApprove(buyState.price.toString())
                            }
                        >
                            Buy contract
                        </Button>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <div className={box}>
                    <div className="mb-3">
                        <SelectContract
                            list={userContractList}
                            selected={sellState.selectedContract}
                            onChage={(value) => {
                                setSellState({
                                    ...sellState,
                                    selectedContract: value
                                })
                            }}
                        />
                    </div>
                    <TextInput
                        label="Price"
                        value={sellState.price}
                        onChange={({ target }) =>
                            setSellState({
                                ...sellState,
                                price: Number(target.value)
                            })
                        }
                    />
                    <div className="mt-5">
                        <Button
                            bgColor="error"
                            onClick={() =>
                                handlePlaceSellOrder(
                                    sellState.selectedContract,
                                    sellState.price
                                )
                            }
                        >
                            Sell contract
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
