"use client"

import Select from "@/components/selector"

import IconMixed from "@/assets/img/icons/exchange/orderbook-mixed.svg"
import IconSell from "@/assets/img/icons/exchange/orderbook-sell.svg"
import IconBuy from "@/assets/img/icons/exchange/orderbook-buy.svg"
import Image from "next/image"
import { useDexContext } from "@/context"

const TableLayoutSelector = () => {
    const { selectedToken, handleChangeToken } = useDexContext()

    const options = [
        {
            name: "Extract@ / Tether",
            value: "extracto-usdt"
        },
        {
            name: "Extract@ / USD Coin",
            value: "extracto-usdc"
        }
    ]

    return (
        <>
            <div className="flex gap-1">
                <button>
                    <Image
                        src={IconMixed.src}
                        alt="Logo"
                        width={24}
                        height={24}
                    />
                </button>
                <button>
                    <Image
                        src={IconBuy.src}
                        alt="Logo"
                        width={24}
                        height={24}
                    />
                </button>
                <button>
                    <Image
                        src={IconSell.src}
                        alt="Logo"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            <div className="bg-white dark:bg-deep-gray/100 rounded mb-2">
                <Select
                    options={options}
                    value={
                        options.filter((e) => e.value === selectedToken)[0]
                            .value
                    }
                    onChange={(value) => handleChangeToken(value)}
                    placeholder="Teste"
                />
            </div>
        </>
    )
}

export default TableLayoutSelector
