import { IOrder } from "@/hooks/useExchange"
import classNames from "classnames"

interface TableOrderBookProps {
    side: "buy" | "sell"
    orders: IOrder[]
}

const TableOrderBook = ({ side, orders }: TableOrderBookProps) => {
    function toFixed(x: any) {
        if (Math.abs(x) < 1.0) {
            var e = parseInt(x.toString().split("e-")[1])
            if (e) {
                x *= Math.pow(10, e - 1)
                x = "0." + new Array(e).join("0") + x.toString().substring(2)
            }
        } else {
            var e = parseInt(x.toString().split("+")[1])
            if (e > 20) {
                e -= 20
                x /= Math.pow(10, e)
                x += new Array(e + 1).join("0")
            }
        }
        return x
    }

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
                    const price = e.price
                    const amount = e.amount

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
