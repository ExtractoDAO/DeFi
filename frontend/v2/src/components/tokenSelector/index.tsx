"use client"

import { useEffect, useState } from "react"

import { ChevronDownIcon } from "@heroicons/react/20/solid"
import Image from "next/image"

import USDT from "@/assets/img/icons/currencies/usdt.svg"
import USDC from "@/assets/img/icons/currencies/usdc.svg"
import BUSD from "@/assets/img/icons/currencies/busd.svg"
import DAI from "@/assets/img/icons/currencies/dai.svg"

import classnames from "classnames"
import { useClickAnyWhere } from "usehooks-ts"
import { getContractNames } from "@/utils/contractNames"
import { ContractName } from "@/utils/contract"

export interface Token {
    name: string
    symbol: ContractName
    icon: any
}

const contractNames = getContractNames()

export const list: Token[] = [
    {
        name: "Tether",
        symbol: "USDT" as ContractName,
        icon: USDT
    },
    {
        name: "USD Coin",
        symbol: "USDC" as ContractName,
        icon: USDC
    },
    {
        name: "Binance USD",
        symbol: "BUSD" as ContractName,
        icon: BUSD
    },
    {
        name: "Dai",
        symbol: "DAI" as ContractName,
        icon: DAI
    }
]

export const tokens = list.filter((item) =>
    contractNames.includes(item.symbol as ContractName)
)

interface TokenSelectorProps {
    onSelect: (item: Token) => void
    selectedToken: Token
}

function TokenSelector({ onSelect, selectedToken }: TokenSelectorProps) {
    const [selected, setSelected] = useState<Token>({} as Token)
    const [open, setOpen] = useState(false)
    const [state, setState] = useState(0)

    useEffect(() => {
        setSelected(selectedToken)
    }, [selectedToken])

    useClickAnyWhere(() => {
        if (state === 1) {
            setState(state + 1)
        }
        if (state > 1) {
            setOpen(false)
            setState(0)
        }
    })

    const ListItem = ({ item }: { item: Token }) => (
        <span
            onClick={() => {
                setSelected(item)
                setOpen(false)
                onSelect(item)
            }}
            className={`
                px-4 py-1
                flex items-center gap-2.5
                bg-base/white
                dark:bg-deep-gray/100
                border border-gray/200 dark:border-deep-gray/200
                cursor-pointer
                dark:text-base/white
                text-sm
                whitespace-nowrap
                first-of-type:rounded-t
                last-of-type:rounded-b
            `}
        >
            {item.icon && <Image src={item.icon} alt="usdt" className="w-4" />}
            {item.name}
            <div className="w-1" />
        </span>
    )

    return (
        <div className="relative">
            <button
                className={`
                    py-2 px-4
                    rounded
                    text-gray/900 dark:text-gray/300
                    text-sm
                    bg-base/white
                    border border-gray/200 dark:border-deep-gray/200
                    dark:bg-deep-gray/100
                    flex
                    items-center
                    gap-2.5
                    whitespace-nowrap
                `}
                onClick={() => {
                    setOpen(!open)
                    setState(state + 1)
                }}
            >
                {selected.icon && (
                    <Image src={selected.icon} alt="" className="w-4" />
                )}
                {selected.name}
                <ChevronDownIcon
                    className={classnames({
                        "w-8": true,
                        "dark:text-base/white": true,
                        "rotate-180": open,
                        "transition-transform": true
                    })}
                />
            </button>
            <div
                data-ui={`${open && "tokenSelectOpen"} active`}
                className={`
                    hidden
                    data-tokenSelectOpen:flex
                    flex-col
                    absolute
                    rounded-sm
                `}
            >
                {tokens.map((item) => (
                    <ListItem key={item.symbol} item={item} />
                ))}
            </div>
        </div>
    )
}

export default TokenSelector
