import { useState } from "react"
import { useConnectionStatus, ConnectWallet } from "@thirdweb-dev/react"

import {
    ArrowsUpDownIcon,
    ChartBarIcon,
    DocumentTextIcon,
    ShoppingCartIcon
} from "@heroicons/react/24/solid"

import classnames from "classnames"

import classNames from "classnames"

import Button from "../button"
import Modal from "../modal"
import ModalLoading from "./modalLoading"
import ModalSuccess from "./modalSuccess"
import ValueInput from "../valueInput"
import TokenSelector from "../tokenSelector"
import useContractBuy from "@/hooks/useContractBuy"

interface Props {
    setShowChart: (value: boolean) => void
    showChart: boolean
}

export default function Buy({ setShowChart, showChart }: Props) {
    const {
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
    } = useContractBuy()

    const [inverted, setInverted] = useState(false)
    const connectionStatus = useConnectionStatus()
    const isConnected = connectionStatus === "connected"

    return (
        <div className="flex flex-col items-start gap-2 max-md:w-full max-w-2xl mx-auto">
            <ModalLoading
                open={modal === "loading" || modal === "approving"}
                message={
                    modal === "loading"
                        ? {
                              "line-1": "Wait for confirmation...",
                              "line-2": `${usdValue} USDT for ${kgAmount} Kg.`,
                              "line-3": "Confirm the transaction in your wallet"
                          }
                        : {
                              "line-1": "Wait for approval...",
                              "line-2": `${usdValue} USDT for ${kgAmount} Kg.`,
                              "line-3": `You must approve the ${selectedToken.symbol} spending in your wallet.`
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
                        onClick: () => handleDeploy()
                    },
                    {
                        label: "Cancel",
                        onClick: () => setModal(""),
                        bgColor: "secondary"
                    }
                ]}
            />

            <div className="p-1.5 bg-slate/100 rounded-md dark:bg-deep-gray/500">
                <button className="bg-base/white py-1.5 px-3.5 rounded text-sm text-gray/900 dark:bg-deep-gray/100 dark:text-gray/300">
                    Buy
                </button>
                <button
                    className="py-1.5 px-3.5 rounded text-sm text-gray/400 dark:text-gray/300"
                    disabled
                >
                    Conversion
                </button>
            </div>
            <div className=" p-6 bg-base/white dark:bg-deep-gray/100 w-full">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-slate/500">
                        Buy <b>future contracts</b> with main stablecoins
                    </span>
                    <div className="flex gap-2">
                        <button onClick={() => setShowChart(!showChart)}>
                            <ChartBarIcon className="w-5 text-slate/400" />
                        </button>
                        <button>
                            <DocumentTextIcon className="w-5 text-slate/400" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div
                        className={classnames({
                            flex: true,
                            "gap-4": true,
                            relative: true,
                            "flex-col": !inverted,
                            "flex-col-reverse": inverted,
                            "transition-transform": true
                        })}
                    >
                        <ValueInput
                            label="From"
                            value={usdValue}
                            onChange={(event) => {
                                setUsdValue(event.target.value)
                                updateAmount(Number(event.target.value))
                            }}
                            insideElement={{
                                element: () => (
                                    <TokenSelector
                                        selectedToken={selectedToken}
                                        onSelect={(token) =>
                                            setSelectedToken(token)
                                        }
                                    />
                                )
                            }}
                            showMaxButton
                            labelRightContent={`Balance: ${userBalance.toString()}`}
                        />
                        <button
                            onClick={() => setInverted(!inverted)}
                            className={`
                            p-2
                            border
                            border-slate/200
                            rounded-md
                            absolute
                            bg-base/white
                            top-2/4
                            left-2/4
                            -translate-x-2/4
                            -translate-y-2/4
                            dark:bg-gray/900
                            dark:border-slate/700
                        `}
                        >
                            <ArrowsUpDownIcon className="w-5 text-slate/700" />
                        </button>
                        <ValueInput
                            label="To (Estimated)"
                            conversion={{
                                value: `$ ${price}`,
                                variation: "(+ 0.189%)"
                            }}
                            value={kgAmount}
                            onChange={(event) => {
                                setKgAmount(event.target.value)
                                setUsdValue(event.target.value)
                                updateValue(Number(event.target.value))
                            }}
                        />
                    </div>
                    {isConnected ? (
                        <Button
                            bgColor="primary"
                            onClick={() => handleApprove()}
                        >
                            Buy contract
                        </Button>
                    ) : (
                        <ConnectWallet
                            className={classNames({
                                [`w-full
                                justify-center
                                inline-flex
                                py-2
                                px-4
                                items-center
                                gap-[10px]
                                text-sm
                                not-italic
                                font-medium
                                rounded-[4px]
                                text-base/white
                                bg-brand/secondary/500
                                hover:bg-brand/secondary/600
                                focus:outline-brand/secondary/300
                                focus:outline
                                focus:outline-2
                                focus:outline-offset-1
                                cursor-pointer

                                disabled:bg-brand/secondary/100
                                disabled:text-brand/secondary/300
                                disabled:cursor-default

                                dark:bg-brand/primary/500
                                dark:text-deep-gray/100
                                dark:hover:bg-brand/primary/400
                                dark:focus:outline-brand/primary/200

                                dark:disabled:text-brand/primary/500
                                dark:disabled:bg-brand/primary/200
                                `]: true
                            })}
                        />
                    )}
                </div>
            </div>
            <div className="w-full text-center mt-2">
                <p className="text-slate/500">
                    Extracto DAO available in:{" "}
                    <span className="text-brand/primary/500">English</span>
                </p>
            </div>
        </div>
    )
}
