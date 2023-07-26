import BookIcon from "@/assets/img/icons/orderbook/book.svg"
import BuyIcon from "@/assets/img/icons/orderbook/buy.svg"
import SellIcon from "@/assets/img/icons/orderbook/sell.svg"

import Image from "next/image"

export default function Orderbook() {
    const buyOrders = new Array(18).fill("")
    const sellOrders = new Array(18).fill("")

    return (
        <div>
            <div className="flex justify-between">
                <div className="flex gap-1">
                    <button>
                        <Image src={BookIcon} alt="book" />
                    </button>
                    <button>
                        <Image src={BuyIcon} alt="book" />
                    </button>
                    <button>
                        <Image src={SellIcon} alt="book" />
                    </button>
                </div>
                <div>
                    <select>
                        <option>Extract@ / Tether</option>
                        <option>Extract@ / USDCoin</option>
                        <option>Extract@ / Binance USD</option>
                        <option>Extract@ / DAI</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>PRICE</td>
                        <td>AMOUNT</td>
                        <td>TOTAL</td>
                    </tr>
                </thead>
                <tbody>
                    {buyOrders.map((_, i) => {
                        return (
                            <tr key={i}>
                                <td>19967.58</td>
                                <td>0.73579</td>
                                <td>0.58</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr className="text-red/500 text-lg">
                        <td>19,965.74</td>
                        <td></td>
                        <td>0.58</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <td>PRICE</td>
                        <td>AMOUNT</td>
                        <td>TOTAL</td>
                    </tr>
                </thead>
                <tbody>
                    {sellOrders.map((_, i) => {
                        return (
                            <tr key={i}>
                                <td>19965.54</td>
                                <td>0.03576</td>
                                <td>713.96771</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
