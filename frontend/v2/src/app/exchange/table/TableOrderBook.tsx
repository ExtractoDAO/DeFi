import { IOrder } from "@/hooks/useExchange"
import classNames from "classnames"

interface TableOrderBookProps {
    side: "buy" | "sell"
    orders: IOrder[]
}

const TableOrderBook = ({ side, orders }: TableOrderBookProps) => {
    return (
        <table className="w-full shadow-md">
            <thead>
                <tr className="rounded-lg">
                    <th
                        className="
                        text-gray/500
                        bg-gray/50
                        dark:bg-gray/sidemodal/900
                        py-3 px-6
                        text-xs text-left
                        rounded-tl-sm
                        border-l border-t border-b
                        border-gray/200 dark:border-slate/800
                        uppercase
                        "
                    >
                        Price
                    </th>
                    <th
                        className="
                        text-gray/500
                        bg-gray/50
                        dark:bg-gray/sidemodal/900
                        py-3 px-6
                        text-xs text-center
                        border-t border-b
                        border-gray/200 dark:border-slate/800
                        uppercase
                        "
                    >
                        Amount
                    </th>
                    <th
                        className="
                          text-gray/500
                          bg-gray/50
                          dark:bg-gray/sidemodal/900
                          py-3 px-6
                          text-xs text-right
                          rounded-tr-sm
                          border-r border-t border-b
                        border-gray/200 dark:border-slate/800
                        uppercase
                        "
                    >
                        Total
                    </th>
                </tr>
            </thead>
            <tbody>
                {orders.map((e, i) => {
                    const price = e.price / 10 ** 18
                    const amount = e.amount / 10 ** 18

                    return (
                        <tr key={i}>
                            <td
                                className={classNames({
                                    "text-gray/500 text-left border-l border-t border-b border-gray/200 dark:border-slate/800 py-[0.38rem] px-6 text-xs bg-white dark:bg-deep-gray/100":
                                        true,
                                    "text-red/400": side === "sell",
                                    "text-green/500": side === "buy"
                                })}
                            >
                                {price}
                            </td>
                            <td
                                className="
                                text-gray/500
                                text-center
                                border-t border-b
                                border-gray/200 dark:border-slate/800
                                py-[0.38rem] px-6
                                text-xs
                                bg-white
                                dark:bg-deep-gray/100
                            "
                            >
                                {amount}
                            </td>
                            <td
                                className="
                                text-gray/500
                                text-right
                                border-r border-t border-b
                                border-gray/200 dark:border-slate/800
                                py-[0.38rem] px-6
                                text-xs
                                bg-white
                                dark:bg-deep-gray/100
                            "
                            >
                                {(amount * price).toFixed(2)}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableOrderBook
