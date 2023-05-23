// TradingViewWidget.tsx
import React, { useEffect, useRef, FC } from "react"

const TradingViewWidget: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const script = document.createElement("script")
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js"
        script.type = "text/javascript"
        script.async = true
        script.innerHTML = `
        {
          "symbols": [
            [
              "USDT/USD",
              "COINBASE:USDTUSD|1D"
            ],
            [
              "BUSD/USD",
              "BINANCEUS:BUSDUSD|1D"
            ],
            [
              "USDC/USD",
              "GEMINI:USDCUSD|1D"
            ],
            [
              "DAI/USD",
              "COINBASE:DAIUSD|1D"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "light",
          "autosize": false,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "line"
        }`

        containerRef.current?.appendChild(script)
    }, [])

    return (
        <div className="tradingview-widget-container" ref={containerRef}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a
                    href="https://www.tradingview.com/symbols/USDTUSD/?exchange=COINBASE"
                    rel="noopener"
                    target="_blank"
                >
                    <span className="blue-text">USDT/USD</span>
                </a>{" "}
                by TradingView
            </div>
        </div>
    )
}

export default TradingViewWidget
