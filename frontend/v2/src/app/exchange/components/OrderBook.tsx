"use client"

import useExchange from "@/hooks/useExchange"
import TableOrderBook from "../table/TableOrderBook"
import TableLayoutSelector from "./TableLayoutSelector"
import { useState } from "react"

export default function OrderBook() {
    const { buyOrders, sellOrders } = useExchange()
    const [layout, setLayout] = useState<"buy" | "sell" | "both">("both")

    return (
        <>
            <div className="flex justify-between">
                <TableLayoutSelector setLayout={(value) => setLayout(value)} />
            </div>
            <div>
                {!!(layout === "sell" || layout === "both") && (
                    <TableOrderBook side="sell" orders={sellOrders} />
                )}
                {!!(layout === "buy" || layout === "both") && (
                    <TableOrderBook side="buy" orders={buyOrders} />
                )}
            </div>
        </>
    )
}
