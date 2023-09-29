import ChartComponent from "@/components/chart"
import ExchangeTopBar from "@/components/exchangeTopbar"

import TextInput from "@/components/textInput"
import classNames from "classnames"
import SelectContract from "./components/SelectContract"

import Button from "@/components/button"

import TableUserOrders from "./table/TableUserOrders"
import useExchange from "@/hooks/useExchange"
import OrderBook from "./components/OrderBook"
import PlaceOrder from "./components/PlaceOrder"

export default function page() {
    return (
        <>
            <ExchangeTopBar />
            <div className="p-6 max-md:px-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 lg:col-7">
                            <div className="rounded-md w-full h-[500px]">
                                <ChartComponent />
                            </div>
                            <div className="row">
                                <PlaceOrder />
                            </div>
                        </div>
                        <div className="col-12 lg:col-5">
                            <OrderBook />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 mt-4">
                            <TableUserOrders />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
