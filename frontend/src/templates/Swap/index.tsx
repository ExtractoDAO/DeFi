import { Button, Container, Grid, Typography } from "@mui/material"

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts"

import Header from "components/Header"

import { Box } from "@mui/system"
import OrderBook from "./orderBook"
import useExchange from "./hooks/useExchange"
import ModalBuy from "./ModalBuy"
import { useEffect, useState } from "react"
import ModalSell from "./ModalSell"
import TradingViewWidget from "components/TradinViewWidget"

export default function WalletTemplate() {
    const { getOrders, buyOrders, sellOrders } = useExchange()
    const [modal, setModal] = useState("")

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <>
            <Header />

            <ModalBuy
                open={modal === "place-buy-order"}
                onClose={() => setModal("")}
                getOrders={getOrders}
            />

            <ModalSell
                open={modal === "place-sell-order"}
                onClose={() => setModal("")}
                getOrders={getOrders}
            />

            <Container sx={{ mt: 5, pb: 5 }}>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        style={{
                            maxWidth: "100%"
                        }}
                    >
                        <Grid container>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h2" component="h2">
                                    Trade contracts
                                </Typography>
                                {/*
                                <Typography color="error">
                                    You can buy your contract and generate COW
                                    in 135 days, but trade the contract to third
                                    parties in V2 only
                                </Typography> */}
                            </Box>
                        </Grid>

                        <Grid
                            container
                            // sx={{
                            //     display: "flex",
                            //     alignItems: "center",
                            //     justifyContent: "center",
                            //     mt: 2
                            // }}
                        >
                            <Grid item xs={8} pr={2} pt={1}>
                                <TradingViewWidget />
                                {/* <Grid container>
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <AreaChart
                                            width={300}
                                            height={300}
                                            data={[
                                                ...sortItemsByAmount(
                                                    sellingOrders,
                                                    "sell"
                                                ),
                                                ...sortItemsByAmount(
                                                    mockBuyOrders,
                                                    "buy"
                                                )
                                            ]}
                                            margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0
                                            }}
                                        >
                                            <XAxis dataKey="amount" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area
                                                type="monotone"
                                                dataKey="sellPrice"
                                                stroke="#F05252"
                                                fill="#F05252"
                                                connectNulls
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="buyPrice"
                                                stroke="#4CD074"
                                                fill="#4CD074"
                                                connectNulls
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </Grid> */}
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container>
                                    <Grid
                                        display={"flex"}
                                        justifyContent={"center"}
                                        sx={{ width: "100%" }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="error"
                                            fullWidth
                                            sx={{ mt: 1, mb: 2 }}
                                            onClick={() =>
                                                setModal("place-sell-order")
                                            }
                                        >
                                            Sell
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            fullWidth
                                            sx={{ mt: 1, mb: 2 }}
                                            onClick={() =>
                                                setModal("place-buy-order")
                                            }
                                        >
                                            Buy
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <OrderBook
                                            orders={sellOrders}
                                            side="sell"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <OrderBook
                                            orders={buyOrders}
                                            side="buy"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <Container sx={{ mt: 5, pb: 5 }}>
                <Typography
                    variant="h3"
                    component="h3"
                    style={{
                        bottom: "20px",
                        width: "100%",
                        textAlign: "center"
                    }}
                >
                    We solve the problem of cryptocurrency volatility
                </Typography>
            </Container>
        </>
    )
}
