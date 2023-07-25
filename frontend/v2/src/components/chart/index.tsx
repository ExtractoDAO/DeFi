"use client"

import { theme } from "@/utils/theme"
import Chart from "@qognicafinance/react-lightweight-charts"

interface StockData {
    time: string
    open: number
    high: number
    low: number
    close: number
}

function ChartComponent() {
    const background = theme === "dark" ? "#0d0d0d" : "#ffffff"

    function generateStockDataArray(
        startDate: Date,
        endDate: Date
    ): StockData[] {
        const dataArray: StockData[] = []
        const currentDate = new Date(startDate)

        let prevClose = 180.34

        while (currentDate <= endDate) {
            const dateString = currentDate.toISOString().slice(0, 10)
            const open = prevClose
            const high = getRandomNumberInRange(open, open + 5)
            const low = getRandomNumberInRange(open - 5, open)
            const close = getRandomNumberInRange(low, high)

            const stockData: StockData = {
                time: dateString,
                open,
                high,
                low,
                close
            }

            dataArray.push(stockData)

            prevClose = close
            currentDate.setDate(currentDate.getDate() + 1)
        }

        return dataArray
    }

    function getRandomNumberInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min
    }

    const startDate = new Date("2023-06-01")
    const endDate = new Date("2023-07-31")
    const stockDataArray = generateStockDataArray(startDate, endDate)

    const options = {
        alignLabels: false,

        timeScale: {
            barSpacing: 3,
            lockVisibleTimeRangeOnResize: true,
            rightBarStaysOnScroll: true,
            borderVisible: false,
            visible: true,
            timeVisible: true,
            secondsVisible: false
        },
        layout: {
            backgroundColor: background
        }
    }

    const candlestickSeries = [
        {
            data: stockDataArray
        }
    ]

    return (
        <div className="border dark:border-deep-gray/200 border-gray/200 rounded">
            <Chart
                options={options}
                candlestickSeries={candlestickSeries}
                autoWidth
                height={480}
                legend="Contract@ / USD"
                darkTheme={!!(theme === "dark")}
                from={new Date("2023-06-19").getTime() / 1000}
                to={new Date().getTime() / 1000}
            />
        </div>
    )
}

export default ChartComponent
