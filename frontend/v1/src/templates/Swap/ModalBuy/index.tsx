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
    TextField,
    Typography
} from "@mui/material"
import AlertDialog from "components/Alert"
import ModalDeployContract from "components/ModalDeployContract"
import SuccessModal from "components/SuccessModal"
import { useState } from "react"

import {
    AccessTime,
    ReportOutlined,
    CheckCircleOutlineOutlined
} from "@mui/icons-material"

import useExchange from "../hooks/useExchange"

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

export default function ModalBuy({ open, onClose, getOrders }: IModalSwap) {
    const {
        handleApprove,
        placeBuyOrder,
        isApproved,
        isConfirmed,
        loading,
        setIsApproved,
        setIsConfirmed
    } = useExchange()
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

    const ButtonIcon = ({ src }: { src: string }) => (
        <img
            src={src}
            style={{ width: "32px", height: "32px", borderRadius: "8px" }}
        />
    )

    const handleClose = () => {
        setValue("")
        setAmount("")
        setIsApproved("waiting")
        setIsConfirmed("waiting")
        onClose()
        getOrders()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{`Place buy order`}</DialogTitle>

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

                    <Grid display="flex" alignItems="center" gap={1}>
                        <Grid
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Typography variant="body1">Approve</Typography>
                            {isApproved === "ok" ? (
                                <CheckCircleOutlineOutlined color="success" />
                            ) : isApproved === "error" ? (
                                <ReportOutlined color="error" />
                            ) : (
                                <AccessTime color="warning" />
                            )}
                        </Grid>

                        <Grid>
                            <div
                                style={{
                                    width: "80px",
                                    backgroundColor: "#ccc",
                                    height: "5px",
                                    marginTop: "20px",
                                    borderRadius: "4px"
                                }}
                            ></div>
                        </Grid>
                        <Grid
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Typography variant="body1">Confirm</Typography>
                            {isConfirmed === "ok" ? (
                                <CheckCircleOutlineOutlined color="success" />
                            ) : isConfirmed === "error" ? (
                                <ReportOutlined color="error" />
                            ) : (
                                <AccessTime color="warning" />
                            )}
                        </Grid>
                    </Grid>

                    <Grid display="flex">
                        <IconButton
                            title="BUSD"
                            onClick={() => setSelectedPaymentMethod("BUSD")}
                        >
                            <ButtonIcon src={tokenIcons["BUSD"]} />
                        </IconButton>
                        <IconButton
                            title="USDT"
                            onClick={() => setSelectedPaymentMethod("USDT")}
                        >
                            <ButtonIcon src={tokenIcons["USDT"]} />
                        </IconButton>
                        <IconButton
                            title="BUSC"
                            onClick={() => setSelectedPaymentMethod("USDC")}
                        >
                            <ButtonIcon src={tokenIcons["USDC"]} />
                        </IconButton>
                        <IconButton
                            title="DAI"
                            onClick={() => setSelectedPaymentMethod("DAI")}
                        >
                            <ButtonIcon src={tokenIcons["DAI"]} />
                        </IconButton>
                    </Grid>

                    <TextField
                        label="Amount in KG"
                        id="amount"
                        fullWidth
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    kg
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        label={`Value in ${selectedPaymentMethod}`}
                        id="value"
                        fullWidth
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <img
                                        style={{
                                            borderRadius: "50%",
                                            maxWidth: "32px"
                                        }}
                                        src={tokenIcons[selectedPaymentMethod]}
                                    />
                                </InputAdornment>
                            )
                        }}
                    />

                    <Typography variant="body2" align="center">
                        You will pay{" "}
                        <strong>{`${123} ${selectedPaymentMethod}`}</strong> and
                        receive a <strong>{`${321}Kg`}</strong> future contract
                    </Typography>

                    {/* <Typography variant="body2" align="center" color="red">
                    Value should be greather than U$ 10.
                </Typography> */}

                    <Grid display="flex" gap={1}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() =>
                                handleApprove(selectedPaymentMethod, value)
                            }
                            disabled={isApproved === "ok"}
                        >
                            Approve
                        </Button>
                        <Button
                            id="confirm"
                            variant="contained"
                            color="success"
                            fullWidth
                            disabled={
                                isApproved !== "ok" || isConfirmed === "ok"
                            }
                            onClick={() =>
                                placeBuyOrder(
                                    selectedPaymentMethod,
                                    value,
                                    Number(amount)
                                )
                            }
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
