import ValueInput from "../valueInput"

export default function Buy() {
    const TokenSelector = () => (
        <select name="token" id="selectToken">
            <option value="usdt">Tether</option>
            <option value="usdc">USD Coin</option>
            <option value="busd">Binance USD</option>
            <option value="dai">DAI</option>
        </select>
    )

    return (
        <div className="max-md:w-full max-w-2xl p-6 bg-white dark:bg-deep-gray/100 mx-auto">
            <ValueInput
                label="From"
                insideElement={{
                    element: TokenSelector
                }}
            />
            <ValueInput label="To (Estimated)" />
        </div>
    )
}
