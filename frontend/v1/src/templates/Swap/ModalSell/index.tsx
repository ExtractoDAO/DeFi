import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material"
import AlertDialog from "components/Alert"
import ModalDeployContract from "components/ModalDeployContract"
import SuccessModal from "components/SuccessModal"
import { useEffect, useState } from "react"

import {
    AccessTime,
    ReportOutlined,
    CheckCircleOutlineOutlined
} from "@mui/icons-material"

import useExchange from "../hooks/useExchange"
import { useAccount } from "wagmi"
import { addrFormatter } from "utils/format"
import { FutureContract } from "types/DAO"

interface IObj {
    [key: string]: string
}

const tokenIcons: IObj = {
    USDT: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg",
    BUSD: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBUSD--big.svg",
    USDC: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDC--big.svg",
    DAI: "https://s3-symbol-logo.tradingview.com/crypto/XTVCDAI--big.svg"
}

type Payment = "USDT" | "USDC" | "BUSD" | "DAI" | ""

interface IModalSwap {
    open: boolean
    onClose: () => void
    getOrders: () => void
}

export default function ModalSell({ open, onClose, getOrders }: IModalSwap) {
    const {
        placeSellOrder,
        loading,
        setIsApproved,
        setIsConfirmed,
        getContracts,
        fullDrawer
    } = useExchange()
    const { address: account } = useAccount()
    const [selectedContract, setSelectedContract] =
        useState<FutureContract | null>(null)

    const [value, setValue] = useState("")
    const [amount, setAmount] = useState("")
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<Payment>("BUSD")

    const deployingHash = "xabc123"

    const [modal, setModal] = useState("")
    const [modalAlert, setModalAlert] = useState({
        open: false,
        title: "",
        description: ""
    })

    const handleClose = () => {
        setValue("")
        setAmount("")
        setIsApproved("waiting")
        setIsConfirmed("waiting")
        onClose()
        getOrders()
    }

    useEffect(() => {
        getContracts()
    }, [])

    useEffect(() => {
        if (fullDrawer?.length) {
            setSelectedContract(fullDrawer[0])
        }
    }, [fullDrawer])

    useEffect(() => {
        if (selectedContract) {
            setAmount(selectedContract?.amount.toString())
        }
    }, [selectedContract])

    if (!account) {
        return <></>
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{`Place sell order`}</DialogTitle>

            <DialogContent>
                <FormControl
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "25px 15px",
                        background: "#fff",
                        border: "solid 1px #c4c4c4",
                        borderRadius: "10px",
                        width: "400px"
                    }}
                >
                    <ModalDeployContract
                        open={modal === "loading"}
                        hash={deployingHash}
                    />
                    <SuccessModal
                        isOpenModal={modal === "success"}
                        onClose={() => setModal("")}
                    />

                    <AlertDialog
                        open={modalAlert.open}
                        title={modalAlert.title}
                        description={modalAlert.description}
                        handleClockClose={() =>
                            setModalAlert({
                                open: false,
                                title: "",
                                description: ""
                            })
                        }
                    />

                    {fullDrawer ? (
                        <FormControl fullWidth>
                            <InputLabel id="select-contract">
                                Select a contract
                            </InputLabel>
                            <Select
                                value={selectedContract?.address}
                                label="Select a contract"
                                labelId="select-contract"
                                onChange={(e) => {
                                    setSelectedContract(
                                        fullDrawer.filter(
                                            (el) =>
                                                el.address === e.target.value
                                        )[0]
                                    )
                                }}
                            >
                                {fullDrawer?.map((e, i) => {
                                    return (
                                        <MenuItem
                                            value={e?.address}
                                            key={i}
                                        >{`${e?.address} - ${e?.amount}Kg`}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    ) : null}

                    <TextField
                        label="Amount in KG"
                        id="amount"
                        fullWidth
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    kg
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        size="small"
                        label={`Value in US$`}
                        id="value"
                        fullWidth
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <Typography variant="body2" align="center">
                        You will sell <strong>{`${123}Kg`}</strong> for{" "}
                        <strong>{`U$${321}`}</strong>
                    </Typography>

                    <Grid display="flex" gap={1}>
                        <Button
                            id="confirm"
                            variant="contained"
                            color="success"
                            fullWidth
                            onClick={() => {
                                if (selectedContract?.address) {
                                    placeSellOrder(
                                        account,
                                        selectedContract?.address,
                                        amount,
                                        value
                                    )
                                }
                            }}
                        >
                            {loading ? (
                                <CircularProgress color="inherit" size={22} />
                            ) : (
                                "Confirm"
                            )}
                        </Button>
                    </Grid>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
