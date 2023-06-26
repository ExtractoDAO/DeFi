import { Box, Container, Grid, Typography } from "@mui/material"

import Header from "components/Header"

import Logo from "assets/images/logo.png"

import Coins from "assets/images/coins.png"
import { useCountdown } from "hooks/useCountDown"

interface ICounter {
    days: number
    hours: number
    minutes: number
    seconds: number
}

const Counter = ({ days, hours, minutes, seconds }: ICounter) => {
    return (
        <Grid item xs={12}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ mb: 5 }}
            >
                <Typography
                    variant="h6"
                    component="h6"
                    align="center"
                    color="#fff"
                >
                    Extracto@ 智能合约谈判将于 15-01-2023 8:00 pm 开始
                </Typography>
            </Box>

            <Box display="flex" justifyContent="center">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ mx: 2 }}
                >
                    <Typography variant="h1" color="#fff">
                        {days}
                    </Typography>
                    <Typography variant="caption" color="#fff">
                        Days
                    </Typography>
                </Box>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ mx: 2 }}
                >
                    <Typography variant="h1" color="#fff">
                        {hours}
                    </Typography>
                    <Typography variant="caption" color="#fff">
                        Hours
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ mx: 2 }}
                >
                    <Typography variant="h1" color="#fff">
                        {minutes}
                    </Typography>
                    <Typography variant="caption" color="#fff">
                        Minutes
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ mx: 2 }}
                >
                    <Typography variant="h1" color="#fff">
                        {seconds}
                    </Typography>
                    <Typography variant="caption" color="#fff">
                        Seconds
                    </Typography>
                </Box>
            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ mt: 5 }}
            >
                <Typography
                    variant="h6"
                    component="h6"
                    align="center"
                    color="#fff"
                >
                    Opening of negotiations for Extracto@ smart contracts on
                    15-01-2023 8:00 pm
                </Typography>
            </Box>
        </Grid>
    )
}

export default function HomeTemplate() {
    const [days, hours, minutes, seconds] = useCountdown("2023-01-15 20:00:00")

    return (
        <>
            <Header />
            <Container
                maxWidth={false}
                style={{
                    height: "calc(100vh - 64px)",
                    padding: 0,
                    margin: 0,
                    backgroundImage:
                        "radial-gradient(circle, #d3d3d3,  #3b3b3b)",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Container>
                    <Grid container>
                        <Grid
                            item
                            md={5}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="center"
                                style={{ height: "100%" }}
                                sx={{
                                    ["& img"]: {
                                        maxWidth: "350px"
                                    },
                                    ["@media(max-width: 1400px)"]: {
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        ["& img"]: {
                                            maxWidth: "300px"
                                        }
                                    }
                                }}
                            >
                                <img
                                    src={Logo.src}
                                    style={{
                                        width: "100%",
                                        marginBottom: "30px"
                                    }}
                                />

                                <Typography
                                    variant="h6"
                                    style={{
                                        color: "#fff",
                                        marginBottom: "50px"
                                    }}
                                >
                                    The DeFi 2.0
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item md={7}>
                            <Grid
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                    height: "100%",
                                    ["& img"]: {
                                        maxWidth: "550px"
                                    },
                                    ["@media(max-width: 1400px)"]: {
                                        ["& img"]: {
                                            maxWidth: "400px"
                                        }
                                    },
                                    ["@media(max-width: 992px)"]: {
                                        display: "none"
                                    }
                                }}
                            >
                                <img src={Coins.src} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container>
                        {days + hours + minutes + seconds > 0 && (
                            <Counter
                                days={days}
                                hours={hours}
                                minutes={minutes}
                                seconds={seconds}
                            />
                        )}
                    </Grid>
                </Container>
            </Container>
        </>
    )
}
