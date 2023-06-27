import { Button, createStyles } from "@mui/material"

const styles: any = createStyles({
    widgetContainer: {
        padding: "10px",
        border: "1px solid #e0e3eb",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        marginBottom: "10px"
    },
    icon: {
        borderRadius: "50%",
        maxWidth: "64px"
    },
    span: {
        color: "#131722",
        display: "inline-flex",
        fontSize: "14px",
        fontWeight: "700",
        height: "16px",
        lineHeight: "16px",
        padding: "0 8px"
    }
})

type Payment = "USDT" | "USDC" | "BUSD" | "DAI" | ""
interface Props {
    setOpenModalBuy: (open: boolean) => void
    setPaymentCoin: (coin: Payment) => void
}

export const TetherWidget = ({ setOpenModalBuy, setPaymentCoin }: Props) => {
    return (
        <div style={styles.widgetContainer}>
            <img
                style={styles.icon}
                src="https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg"
            />
            <div>
                <span style={styles.span}>Tether</span>
                <Button
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => {
                        setOpenModalBuy(true)
                        setPaymentCoin("USDT")
                    }}
                >
                    Trade USDT for futures
                </Button>
            </div>
        </div>
    )
}

export const BUSDWidget = ({ setOpenModalBuy, setPaymentCoin }: Props) => {
    return (
        <div style={styles.widgetContainer}>
            <img
                style={styles.icon}
                src="https://s3-symbol-logo.tradingview.com/crypto/XTVCBUSD--big.svg"
            />
            <div>
                <span style={styles.span}>Binance USD</span>
                <Button
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => {
                        setOpenModalBuy(true)
                        setPaymentCoin("BUSD")
                    }}
                >
                    Trade BUSD for futures
                </Button>
            </div>
        </div>
    )
}

export const USDCWidget = ({ setOpenModalBuy, setPaymentCoin }: Props) => {
    return (
        <div style={styles.widgetContainer}>
            <img
                style={styles.icon}
                src="https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDC--big.svg"
            />
            <div>
                <span style={styles.span}>USD Coin</span>
                <Button
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => {
                        setOpenModalBuy(true)
                        setPaymentCoin("USDC")
                    }}
                >
                    Trade USDC for futures
                </Button>
            </div>
        </div>
    )
}

export const DAIWidget = ({ setOpenModalBuy, setPaymentCoin }: Props) => {
    return (
        <div style={styles.widgetContainer}>
            <img
                style={styles.icon}
                src="https://s3-symbol-logo.tradingview.com/crypto/XTVCDAI--big.svg"
            />
            <div>
                <span style={styles.span}>Dai</span>
                <Button
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => {
                        setOpenModalBuy(true)
                        setPaymentCoin("DAI")
                    }}
                >
                    Trade DAI for futures
                </Button>
            </div>
        </div>
    )
}
