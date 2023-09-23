import classNames from "classnames"

interface TableOrderBookProps {
    side: "buy" | "sell"
}

const TableOrderBook = ({ side }: TableOrderBookProps) => {
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
                {new Array(10).fill("").map((e, i) => {
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
                                19967.98
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
                                0.10016
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
                                0.58
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableOrderBook
