import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

import { formatCurrency } from "utils/format"
import { Order } from "./hooks/useExchange"
import useContract from "hooks/useContract"
import settings from "config/settings"

interface IObj {
    [key: string]: string
}

interface ObjTokens {
    [key: string]: number
}

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

interface IOrderBook {
    orders: Order[]
    side: "sell" | "buy"
}

export default function OrderBook({ orders, side }: IOrderBook) {
    const { getTokenDecimals } = useContract()

    const colors: any = {
        sell: {
            headLine: "#F05252",
            button: "error"
        },
        buy: {
            headLine: "#4CD074",
            button: "success"
        }
    }

    function sortItemsByAmount(items: Order[]): Order[] {
        return items.sort((a, b) => Number(a.amount) - Number(b.amount))
    }

    const tokenDecimals: ObjTokens = {
        BUSD: 18,
        USDT: 18,
        USDC: 18,
        DAI: 18,
        xUSD: 18
    }

    // TODO: Antes de subir em produção, precisa customizar os decimais de cada token de acordo com os tokens reais
    const tokens = {
        BUSD: BigInt("0x5fbdb2315678afecb367f032d93f642f64180aa3"),
        USDT: BigInt("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"),
        USDC: BigInt("0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"),
        DAI: BigInt("0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"),
        xUSD: BigInt("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9")
    }

    function getKeyByValue(obj: Record<string, any>, value: any) {
        const keys = Object.keys(obj)
        for (const key of keys) {
            if (obj[key] === value) {
                return key
            }
        }
    }

    return (
        <>
            <TableContainer
                component={Paper}
                style={{
                    maxHeight: "600px"
                }}
            >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell
                                style={{
                                    backgroundColor: colors[side].headLine
                                }}
                            >
                                Amount
                            </StyledTableCell>
                            <StyledTableCell
                                style={{
                                    backgroundColor: colors[side].headLine
                                }}
                                align="right"
                            >
                                Price (USD)
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortItemsByAmount(orders).map((row, index) => {
                            const key =
                                getKeyByValue(
                                    tokens,
                                    BigInt(row.tokenAddress)
                                ) || 1

                            const decimals = tokenDecimals[key]

                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="right">
                                        {Number(row.commodityAmount)} Kg
                                    </StyledTableCell>

                                    <StyledTableCell align="right">
                                        {formatCurrency(
                                            Number(row.amount) / 10 ** decimals
                                        )}
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
