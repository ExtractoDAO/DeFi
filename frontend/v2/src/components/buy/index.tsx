import ValueInput from "../valueInput"
import TokenSelector, { Token, tokens } from "../tokenSelector"

import classnames from "classnames"

import {
    ChartBarIcon,
    DocumentTextIcon,
    ArrowsUpDownIcon
} from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import Button from "../button"

import { useAccount } from "wagmi"

import useContract from "@/hooks/useContract"
import useBalance from "@/hooks/useBalance"

interface Props {
    setShowChart: (value: boolean) => void
    showChart: boolean
}

export default function Buy({ setShowChart, showChart }: Props) {
    const [price, setPrice] = useState<any>(0)
    const { read, write } = useContract("Commodity")
    const { address } = useAccount()

    const [selectedToken, setSelectedToken] = useState<Token>(tokens[0])
    const { read: readToken } = useContract(selectedToken.symbol)

    const { fetchBalance } = useBalance(selectedToken.symbol)
    const [userBalance, setUserBalance] = useState(0)

    const [usdValue, setUsdValue] = useState("")

    useEffect(() => {
        async function getBalance() {
            if (address) {
                const res = await fetchBalance(address)
                const decimals = await readToken("decimals")
                const response = Number(res) / 10 ** decimals
                if (typeof response === "number") {
                    setUserBalance(Number(res) / 10 ** decimals)
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
    }, [address])

    const [inverted, setInverted] = useState(false)

    return (
        <div className="flex flex-col items-start gap-2 max-md:w-full max-w-2xl mx-auto">
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
                            onChange={(e) => setUsdValue(e.target.value)}
                            insideElement={{
                                element: () => (
                                    <TokenSelector
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
                        />
                    </div>
                    <Button bgColor="primary">Confirm</Button>
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
