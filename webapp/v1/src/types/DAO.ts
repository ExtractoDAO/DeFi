export interface FutureContract {
    address: string
    investor: string
    amount: number
    activated?: boolean
    price?: number | string
    blocktime?: number
    withdrawn?: boolean
    dateLimit?: string
    blockLimit?: number
    valueInFiat?: number
    paymentToken?: "USDT" | "USDC" | "BUSD" | "DAI" | ""
}
