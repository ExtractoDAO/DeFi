import ChartComponent from "@/components/chart"
import ExchangeTopBar from "@/components/exchangeTopbar"

import TextInput from "@/components/textInput"
import classNames from "classnames"
import SelectContract from "./SelectContract"
import TableOrderBook from "./TableOrderBook"
import Button from "@/components/button"
import TableLayoutSelector from "./TableLayoutSelector"

export default function page() {
    const box = classNames({
        "bg-white dark:bg-deep-gray/100": true,
        "rounded-md": true,
        "w-full": true,
        "p-4": true,
        "shadow-sm": true,
        border: true,
        "border-solid": true,
        "border-gray/200 dark:border-gray/600": true
    })

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
                                <div className="col-12 lg:col-6">
                                    <div className={box}>
                                        <TextInput label="Commodity amount" />
                                        <TextInput label="Price" />
                                        <div className="mt-5">
                                            <Button bgColor="success">
                                                Buy contract
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 lg:col-6">
                                    <div className={box}>
                                        <div className="mb-3">
                                            <SelectContract />
                                        </div>
                                        <TextInput label="Price" />
                                        <div className="mt-5">
                                            <Button bgColor="error">
                                                Buy contract
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-5">
                            <div className="flex justify-between">
                                <TableLayoutSelector />
                            </div>
                            <div>
                                <TableOrderBook side="sell" />
                                <TableOrderBook side="buy" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 mt-4">
                            <div className={box}>User orders</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
