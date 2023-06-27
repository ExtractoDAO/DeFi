import { Container, Grid, Typography } from "@mui/material"
import Header from "components/Header"
import TradingViewWidget from "components/TradinViewWidget"
import {
    BUSDWidget,
    DAIWidget,
    TetherWidget,
    USDCWidget
} from "components/TradinViewWidget/FiatWidgets"
import CommodityCotation from "components/CommodityCotation"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useModal } from "connectkit"
import ModalBuy from "components/ModalBuy"

type Payment = "USDT" | "USDC" | "BUSD" | "DAI" | ""

export default function BuyTemplate() {
    const [openModalBuy, setOpenModalBuy] = useState(false)

    const { isConnected } = useAccount()
    const { setOpen } = useModal()

    const [payment, setPayment] = useState<Payment>("") //

    useEffect(() => {
        if (!isConnected) {
            setOpenModalBuy(false)
            setOpen(true)
        }
    }, [openModalBuy, isConnected])

    return (
        <>
            <Header />

            <ModalBuy
                open={openModalBuy}
                handleClockClose={() => setOpenModalBuy(false)}
                payment={payment}
            />

            <Container sx={{ mt: 5 }}>
                <Grid container>
                    <Grid item>
                        <Typography
                            variant="h2"
                            component="h2"
                            align="center"
                            sx={{ width: "100%", mb: 2 }}
                        >
                            Buy <strong>future contracts</strong> with main
                            stablecoins
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={9} style={{ height: "500px" }}>
                        <TradingViewWidget />
                    </Grid>
                    <Grid item md={3}>
                        <TetherWidget
                            setPaymentCoin={(coin) => setPayment(coin)}
                            setOpenModalBuy={(value) => setOpenModalBuy(value)}
                        />
                        <BUSDWidget
                            setPaymentCoin={(coin) => setPayment(coin)}
                            setOpenModalBuy={(value) => setOpenModalBuy(value)}
                        />
                        <USDCWidget
                            setPaymentCoin={(coin) => setPayment(coin)}
                            setOpenModalBuy={(value) => setOpenModalBuy(value)}
                        />
                        <DAIWidget
                            setPaymentCoin={(coin) => setPayment(coin)}
                            setOpenModalBuy={(value) => setOpenModalBuy(value)}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ my: 1 }}>
                        <Typography
                            variant="body1"
                            align="center"
                            sx={{ fontSize: 12, color: "#666", mx: "auto" }}
                        >
                            ExtractoDAO specializes in issuing trading contracts
                            for various products and markets, integrating real-world
                            economy with blockchain technology. Ethereum tokenizes any asset,
                            Drawer attaches any physical or virtual asset to smart contracts,
                            and delivers it to the buyer. We started with an exclusive futures
                            contract with a 135-day term, which upon expiration results in the burning
                            and generation of the stablecoin COW, pegged to the US dollar and exchangeable
                            for other currencies such as USDC, USDT, USD, and DAI. The contract is called Extracto@,
                            based on cattle fattening.
                            <br />
                            <br />
                            Additionally, our exclusive futures contract with a 135-day
                            term generates revenue in stablecoins that exceeds MakerDAO,
                            CurveDAO, Aave, and any staking that locks currency for the same period.
                            With cattle fattening profits ranging from 3% to 14% in just 135 days,
                            ExtractoDAO is a DeFi like any other that locks cryptocurrencies.
                            However, it has the unique characteristic of "closing a contract"
                            while producing real-world commodities and avoiding insane multilateral
                            risks of bets or speculations.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <CommodityCotation
                            setPaymentCoin={(coin) => setPayment(coin)}
                            setOpenModalBuy={(value) => setOpenModalBuy(value)}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
