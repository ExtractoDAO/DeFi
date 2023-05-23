import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button, Typography } from "@mui/material"
import { FutureContract } from "types/DAO"
import ModalSwapContract from "components/ModalSwapContract"

import BUSD from "assets/images/stablecoins/busd.png"
import DAI from "assets/images/stablecoins/dai.png"
import USDC from "assets/images/stablecoins/usdc.png"
import USDT from "assets/images/stablecoins/usdt.png"
import COW from "assets/images/stablecoins/COW.png"

import ArrobaCoin from "assets/images/arroba.png"
import { formatCurrency } from "utils/format"
import ModalBuy from "components/ModalBuy"
import { useAccount } from "wagmi"
import { useModal } from "connectkit"

interface ITableSaleFutures {
    futures: FutureContract[]
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export interface ContractSale {
    address: string
    price: number
    acv: number
    amount: number
    dateLimit: string
    investor: string
}

const staticFutures: ContractSale[] = [
    {
        address: "0x3dE2Da43d4c1B137E385F36b400507c1A24401f8",
        price: 10,
        acv: 999,
        amount: 2.58,
        dateLimit: "2023-05-22",
        investor: "0x5b63234EDE6C88aB2547d13A0455A87F0D5f6a58"
    },
    {
        address: "0x579DbC2D1e7a095C91818d8047a98FAaDa7d49d9",
        price: 10,
        acv: 999,
        amount: 2.58,
        dateLimit: "2023-05-30",
        investor: "0x5b63234EDE6C88aB2547d13A0455A87F0D5f6a58"
    },
    {
        address: "0x856e4424f806D16E8CBC702B3c0F2ede5468eae5",
        price: 10,
        acv: 999,
        amount: 2.58,
        dateLimit: "2023-06-22",
        investor: "0x5b63234EDE6C88aB2547d13A0455A87F0D5f6a58"
    },
    {
        address: "0x8f5b123cD2b3676b9fc14Dbd818431e42c247BC8",
        price: 10,
        acv: 999,
        amount: 2.58,
        dateLimit: "2023-07-10",
        investor: "0x5b63234EDE6C88aB2547d13A0455A87F0D5f6a58"
    },
    {
        address: "0x979DC264DAE62e8957090F0b6D45B9b0652D1Dee",
        price: 10,
        acv: 999,
        amount: 2.58,
        dateLimit: "2023-07-12",
        investor: "0x5b63234EDE6C88aB2547d13A0455A87F0D5f6a58"
    },
    {
        address: "0xddEA3d67503164326F90F53CFD1705b90Ed1312D",
        price: 10,
        acv: 999,
        amount: 2.58,
        dateLimit: "2023-07-13",
        investor: "0x5b63234EDE6C88aB2547d13A0455A87F0D5f6a58"
    }
]

export default function TableComponent({ futures = staticFutures }) {
    const [modalSwap, setModalSwap] = React.useState(false)
    const [selected, setSelected] = React.useState<ContractSale | null>(null)
    const [openModalBuy, setOpenModalBuy] = React.useState(false)

    const { isConnected } = useAccount()
    const { setOpen } = useModal()

    function createData(future: ContractSale) {
        const { address, price, acv, amount, dateLimit, investor } = future
        return { address, price, acv, amount, dateLimit, investor }
    }

    const rows = futures.map((future) => createData(future))

    return (
        <>
            <ModalBuy
                open={openModalBuy}
                handleClockClose={() => setOpenModalBuy(false)}
                payment="USDT"
            />
            <TableContainer component={Paper}>
                {selected && modalSwap && (
                    <ModalSwapContract
                        contract={selected}
                        isOpen={modalSwap}
                        handleClose={() => {
                            setModalSwap(false)
                            setSelected(null)
                        }}
                    />
                )}
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell
                                style={{
                                    backgroundColor: "#dd8960"
                                }}
                            >
                                Smart futures contracts for sell
                            </StyledTableCell>
                            <StyledTableCell
                                style={{
                                    backgroundColor: "#dd8960"
                                }}
                                align="right"
                            >
                                Price (USD)
                            </StyledTableCell>

                            <StyledTableCell
                                style={{
                                    backgroundColor: "#dd8960"
                                }}
                                align="right"
                            >
                                Amount (kg)
                            </StyledTableCell>
                            <StyledTableCell
                                style={{
                                    backgroundColor: "#dd8960"
                                }}
                                align="right"
                            >
                                Expiration Date
                            </StyledTableCell>

                            <StyledTableCell
                                style={{
                                    backgroundColor: "#dd8960"
                                }}
                                align="right"
                            >
                                Accept payments
                            </StyledTableCell>

                            <StyledTableCell
                                style={{
                                    backgroundColor: "#dd8960"
                                }}
                            >
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            const labelId: string = `enhanced-table-checkbox-${index}`

                            return (
                                <StyledTableRow key={row.address}>
                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        id={labelId}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                gap: "8px"
                                            }}
                                        >
                                            <img
                                                style={{
                                                    maxWidth: "32px"
                                                }}
                                                src={ArrobaCoin.src}
                                            />
                                            {row.address}
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {formatCurrency(row.price)}
                                    </StyledTableCell>

                                    <StyledTableCell align="right">
                                        {row.amount} Kg
                                    </StyledTableCell>

                                    <StyledTableCell align="right">
                                        {row.dateLimit}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div>
                                            <img
                                                src={USDT.src}
                                                className="icons-payment"
                                                alt=""
                                                title="USDT"
                                            />
                                            <img
                                                src={USDC.src}
                                                className="icons-payment"
                                                alt=""
                                                title="USDC"
                                            />
                                            <img
                                                src={DAI.src}
                                                className="icons-payment"
                                                alt=""
                                                title="DAI"
                                            />
                                            <img
                                                src={BUSD.src}
                                                className="icons-payment"
                                                alt=""
                                                title="BUSD"
                                            />
                                            <img
                                                src={COW.src}
                                                className="icons-payment"
                                                alt=""
                                                title="COW"
                                            />
                                        </div>
                                    </StyledTableCell>
                                    <TableCell padding="checkbox">
                                        <Button
                                            color="primary"
                                            aria-labelledby={labelId}
                                            onClick={() => {
                                                if (!isConnected) {
                                                    setOpen(true)
                                                    return
                                                }

                                                setOpenModalBuy(true)
                                            }}
                                        >
                                            Buy
                                        </Button>
                                    </TableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography
                variant="h3"
                component="h3"
                sx={{
                    my: 2,
                    width: "100%",
                    textAlign: "right",
                    fontWeight: "bold"
                }}
            >
                ACV (Active Contracts Value): 980000kg
            </Typography>
        </>
    )
}
