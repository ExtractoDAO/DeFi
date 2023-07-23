"use client"

import { useState } from "react"

import { ChevronDownIcon } from "@heroicons/react/20/solid"
import Image from "next/image"

import USDT from "@/assets/img/icons/currencies/usdt.svg"
import USDC from "@/assets/img/icons/currencies/usdc.svg"
import BUSD from "@/assets/img/icons/currencies/busd.svg"
import DAI from "@/assets/img/icons/currencies/dai.svg"

import classnames from "classnames"
import { useClickAnyWhere } from "usehooks-ts"

interface IObj {
    [key: string]: string
}

function TokenSelector() {
    const [selected, setSelected] = useState("Tether")
    const [open, setOpen] = useState(false)
    const [state, setState] = useState(0)

    useClickAnyWhere(() => {
        console.log("AQUIII")
        if (state === 1) {
            setState(state + 1)
        }
        if (state > 1) {
            setOpen(false)
            setState(0)
        }
    })

    const icons: IObj = {
        Tether: USDT,
        "USD Coin": USDC,
        "Binance USD": BUSD,
        DAI: DAI
    }

    const ListItem = ({ item }: { item: string }) => (
        <span
            onClick={() => {
                setSelected(item)
                setOpen(false)
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
            <Image src={icons[item]} alt="usdt" className="w-4" />
            {item}
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
                <Image src={icons[selected]} alt="" className="w-4" />
                {selected}
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
                {["Tether", "USD Coin", "Binance USD", "DAI"].map((item) => (
                    <ListItem key={item} item={item} />
                ))}
            </div>
        </div>
    )
}

export default TokenSelector
