"use client"

import useExchange from "@/hooks/useExchange"
import TableOrderBook from "../table/TableOrderBook"
import TableLayoutSelector from "./TableLayoutSelector"

export default function OrderBook() {
    const { buyOrders, sellOrders, loading } = useExchange()

    return (
        <>
            <div className="flex justify-between">
                <TableLayoutSelector />
            </div>
            <div>
                <TableOrderBook side="sell" orders={sellOrders} />
                <TableOrderBook side="buy" orders={buyOrders} />
            </div>
            {loading && <span className="text-white">Loading</span>}
        </>
    )
}
