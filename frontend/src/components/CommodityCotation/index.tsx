import { Box, Button, Container, Table, Typography } from "@mui/material"

import { database } from "services/firebase"

const db = database

import { styled } from "@mui/material/styles"

import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useEffect, useState } from "react"
import { firebaseLogin } from "services/firebase/contracts"

import { onValue, ref } from "firebase/database"
import { network } from "config/settings"
import ModalBuy from "components/ModalBuy"
import { useModal } from "connectkit"
import { useAccount } from "wagmi"

import BUSD from "assets/images/stablecoins/busd.png"
import DAI from "assets/images/stablecoins/dai.png"
import USDC from "assets/images/stablecoins/usdc.png"
import USDT from "assets/images/stablecoins/usdt.png"
import COW from "assets/images/stablecoins/COW.png"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: "6px",
    textAlign: "center",
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0
    }
}))

interface Cotation {
    date: string
    value: number
}

type Payment = "USDT" | "USDC" | "BUSD" | "DAI" | ""
interface Props {
    setOpenModalBuy: (open: boolean) => void
    setPaymentCoin: (coin: Payment) => void
}

export default function CommodityCotation({
    setOpenModalBuy,
    setPaymentCoin
}: Props) {
    const [cotations, setCotations] = useState<Cotation[]>([])

    useEffect(() => {
        try {
            firebaseLogin()
            onValue(ref(db, "cotationHistory"), (snapshot) => {
                const res: {
                    [key: string]: number
                } = snapshot.val()

                if (!res) return

                type Entry = [string, number]
                const output: { date: string; value: number }[] =
                    Object.entries(res)
                        .sort(
                            (a: Entry, b: Entry) =>
                                new Date(b[0]).getTime() -
                                new Date(a[0]).getTime()
                        )
                        .map(([key, value]) => ({ date: key, value }))

                const arr: any[] = Object.values(output)
                setCotations(arr)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    function createData(date: string, value: number) {
        return { date, value }
    }

    const rows = cotations.map((cotation) =>
        createData(cotation.date, cotation.value)
    )

    return (
        <>
            <Typography variant="h2" textAlign={"center"} sx={{ mt: 5 }}>
                Historic @ fat ox
            </Typography>
            <Box
                sx={{
                    backgroundColor: "#fff",
                    border: "solid 1px #c4c4c4",
                    padding: "6px",
                    height: "100%",
                    maxHeight: "600px",
                    overflowY: "scroll",
                    my: 2,

                    ["&::-webkit-scrollbar"]: {
                        width: 0
                    }
                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ width: "100%" }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell
                                    style={{
                                        backgroundColor: "#dd8960"
                                    }}
                                >
                                    Date
                                </StyledTableCell>
                                <StyledTableCell
                                    style={{
                                        backgroundColor: "#dd8960"
                                    }}
                                >
                                    Value
                                </StyledTableCell>
                                <StyledTableCell
                                    style={{
                                        textAlign: "center",
                                        backgroundColor: "#dd8960"
                                    }}
                                >
                                    Buy
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, key) => (
                                <StyledTableRow key={key}>
                                    <StyledTableCell>
                                        {row.date}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        U$ {row.value}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <div>
                                            <img
                                                src={USDT.src}
                                                className="icons-payment"
                                                alt=""
                                                title="USDT"
                                                onClick={() => {
                                                    setOpenModalBuy(true)
                                                    setPaymentCoin("USDT")
                                                }}
                                            />
                                            <img
                                                src={USDC.src}
                                                className="icons-payment"
                                                alt=""
                                                title="USDC"
                                                onClick={() => {
                                                    setOpenModalBuy(true)
                                                    setPaymentCoin("USDC")
                                                }}
                                            />
                                            <img
                                                src={DAI.src}
                                                className="icons-payment"
                                                alt=""
                                                title="DAI"
                                                onClick={() => {
                                                    setOpenModalBuy(true)
                                                    setPaymentCoin("DAI")
                                                }}
                                            />
                                            <img
                                                src={BUSD.src}
                                                className="icons-payment"
                                                alt=""
                                                title="BUSD"
                                                onClick={() => {
                                                    setOpenModalBuy(true)
                                                    setPaymentCoin("BUSD")
                                                }}
                                            />
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
