import {
    Button,
    FormControl,
    Grid,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material"

import TokenSelector from "components/TokenSelector"

import daoABI from "utils/contracts/Commodity.sol/Commodity.json"

import { useEffect, useState } from "react"

import CircularProgress from "@mui/material/CircularProgress"
import AlertDialog from "components/Alert"
import { ethers } from "ethers"

import ModalDeployContract from "components/ModalDeployContract"

import useContract from "hooks/useContract"

import SuccessModal from "components/SuccessModal"
import settings from "config/settings"

import { writeContract } from "services/firebase/contracts"

import { format, addDays, set } from "date-fns"

import { writePrivateEvent } from "services/firebase/events"
import { toast } from "react-toastify"
import { getCurrentBlock } from "utils/convert"

import Poly from "assets/images/poly.png"

import { useModal } from "connectkit"

import { useAccount } from "wagmi"

type Payment = "USDT" | "USDC" | "BUSD" | "DAI" | ""

import {
    AccessTime,
    ReportOutlined,
    CheckCircleOutlineOutlined
} from "@mui/icons-material"

interface IObj {
    [key: string]: string
}

interface Props {
    payment: Payment
}

const inter = new ethers.utils.Interface(daoABI.abi)

const tokenIcons: IObj = {
    USDT: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg",
    BUSD: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBUSD--big.svg",
    USDC: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDC--big.svg",
    DAI: "https://s3-symbol-logo.tradingview.com/crypto/XTVCDAI--big.svg"
}

type BuyStatus = "waiting" | "ok" | "loading" | "error"

export default function BuyContracts({ payment }: Props) {
    const {
        execFunction,
        contractInstance,
        deployingHash,
        loading,
        approveTransaction,
        decodeTransactionData,
        getTokenDecimals
    } = useContract()
    const { address: account } = useAccount()
    const { setOpen } = useModal()
    const [modalSuccess, setModalSuccess] = useState(false)

    const [isApproved, setIsApproved] = useState<BuyStatus>("waiting")
    const [isConfirmed, setIsConfirmed] = useState<BuyStatus>("waiting")

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const selectedPaymentMethod = payment

    const [value, setValue] = useState("")

    const tokens: IObj = settings.getTokens

    const [amountKilo, setAmountKilo] = useState("")
    const [modal, setModal] = useState({
        open: false,
        title: "",
        description: ""
    })

    const [commodityPrice, setCommodityPrice] = useState(0)

    function updateAmount(numberValue: number) {
        setAmountKilo((numberValue / commodityPrice).toFixed(2).toString())
    }

    function updateValue(numberAmount: number) {
        setValue(Math.ceil(numberAmount * commodityPrice).toString())
    }

    useEffect(() => {
        setShowErrorMessage(false)
    }, [value])

    useEffect(() => {
        async function getCommodityPrice() {
            const response = await execFunction({
                instanceType: "dao",
                functionName: "getBuyPrice()"
            })

            setCommodityPrice(Number(response) / 1e18)
        }

        if (account) {
            getCommodityPrice()
        }
    }, [account])

    const handleApprove = async () => {
        if (!account) return

        const decimals = await getTokenDecimals(selectedPaymentMethod)
        const formattedValue = ethers.utils.parseUnits(value, Number(decimals))

        if (Number(value) < 10) {
            setShowErrorMessage(true)
            setModal({
                open: true,
                title: "Invalid value",
                description: "Value should be greather than U$ 10."
            })
            return
        }

        const approve = await approveTransaction(
            selectedPaymentMethod,
            formattedValue
        )

        if (!approve) {
            setIsApproved("error")

            toast.error(
                `Error in contract purchase. Make sure you have enought ${payment} to buy contract.`,
                {
                    position: "top-center",
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                }
            )

            return
        } else {
            setIsApproved("ok")
        }
    }

    const handleDeployFuture = async () => {
        if (!account) return
        const decimals = await getTokenDecimals(selectedPaymentMethod)
        const formattedValue = ethers.utils.parseUnits(value, Number(decimals))

        const tx = await execFunction(
            {
                instanceType: "dao",
                functionName: "createFuture(address,uint256)",
                onFinish: () => setModalSuccess(true)
            },
            tokens[selectedPaymentMethod],
            formattedValue,
            {
                gasLimit: 10000000
            }
        )

        if (!tx) {
            setIsConfirmed("error")

            toast.error(
                `Error in contract purchase. Make sure you have enought ${payment} to buy contract and MATIC to pay network GAS`,
                {
                    position: "top-center",
                    closeOnClick: true,
                    autoClose: false,
                    draggable: true,
                    theme: "colored"
                }
            )

            return
        }

        const provider = new ethers.providers.Web3Provider(
            window?.ethereum as any
        )
        const r = await provider.getTransactionReceipt(tx.hash)

        const contract = contractInstance("dao")
        if (!contract) return
        const x = contract.interface.parseLog(r.logs[0])

        const decodedTx: any = decodeTransactionData(tx.data)
        const dateLimit = addDays(new Date(), 135)

        setIsConfirmed("ok")

        const newContract = {
            address: x.args.future,
            amount: Number(amountKilo),
            investor: account?.toString(),
            dateLimit: format(dateLimit, "MM-dd-yyyy"),
            blockLimit: (await getCurrentBlock()) + Number(x.args.locktime),
            valueInFiat: Number(value),
            paymentToken: payment,
            price: commodityPrice
        }

        await writeContract(newContract)

        toast.success("successful purchase of contract.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        })

        const timestamp = Date.now()

        await writePrivateEvent(account?.toString(), timestamp, {
            type: "buy",
            message: "Successfully purchased contract",
            contractAddress: x.args.future
        })
    }

    return (
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
                open={loading && Number(value) > 0}
                hash={deployingHash}
            />
            <SuccessModal
                isOpenModal={modalSuccess}
                onClose={() => setModalSuccess(false)}
            />

            <AlertDialog
                open={modal.open}
                title={modal.title}
                description={modal.description}
                handleClockClose={() =>
                    setModal({
                        open: false,
                        title: "",
                        description: ""
                    })
                }
            />

            <Grid display="flex" alignItems="center" gap={1}>
                <Grid display="flex" flexDirection="column" alignItems="center">
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
                <Grid display="flex" flexDirection="column" alignItems="center">
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
            <TextField
                label={`Value in ${selectedPaymentMethod}`}
                id="value"
                fullWidth
                value={value}
                type="number"
                onChange={(event) => {
                    setValue(event.target.value)
                    updateAmount(Number(event.target.value))
                }}
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

            <TextField
                label="Amount in KG"
                id="amount"
                fullWidth
                value={amountKilo}
                type="number"
                onChange={(event) => {
                    setAmountKilo(event.target.value)
                    setValue(event.target.value)
                    updateValue(Number(event.target.value))
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">kg</InputAdornment>
                    )
                }}
            />

            <Typography variant="body1">
                Price per KG: US {commodityPrice}
            </Typography>

            {value.length > 0 && (
                <Typography variant="body2" align="center">
                    You will pay{" "}
                    <strong>{`${value} ${selectedPaymentMethod}`}</strong> and
                    receive a <strong>{`${amountKilo}Kg`}</strong> future
                    contract
                </Typography>
            )}

            {showErrorMessage && (
                <Typography variant="body2" align="center" color="red">
                    Value should be greather than U$ 10.
                </Typography>
            )}

            <Grid display="flex" gap={1}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleApprove}
                    disabled={isApproved === "ok"}
                >
                    Approve
                </Button>
                <Button
                    id="confirm"
                    variant="contained"
                    color="success"
                    fullWidth
                    disabled={isApproved !== "ok" || isConfirmed === "ok"}
                    onClick={() => {
                        if (loading) {
                            return
                        }
                        if (!account) {
                            setOpen(true)
                            return
                        }
                        handleDeployFuture()
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
    )
}
