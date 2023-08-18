"use client"

import Buy from "@/components/buy"
import ChartComponent from "@/components/chart"
import { useState } from "react"

import classNames from "classnames"

export default function Page() {
    const [showChart, setShowChart] = useState(false)

    return (
        <div className="w-full flex justify-center">
            <div className="container">
                <div
                    className={classNames({
                        "grid grid-cols-12 gap-6": showChart,
                        "flex justify-center": !showChart
                    })}
                >
                    <div
                        className={classNames({
                            "md:col-span-7 col-span-12": showChart,
                            hidden: !showChart
                        })}
                    >
                        <ChartComponent />
                    </div>
                    <div
                        className={classNames({
                            "md:col-span-5 col-span-12": showChart,
                            "w-full": !showChart
                        })}
                    >
                        <Buy
                            setShowChart={setShowChart}
                            showChart={showChart}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
