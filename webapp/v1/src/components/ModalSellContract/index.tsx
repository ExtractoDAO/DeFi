import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { FutureContract } from "types/DAO"
import {
    CircularProgress,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material"
import useContract from "hooks/useContract"
import { ethers } from "ethers"
import { placeContractSaleOrder } from "services/firebase/contracts"
import { writePrivateEvent } from "services/firebase/events"
import { useAccount } from "wagmi"

interface ModalSellContract {
    isOpen: boolean
    handleClose: () => void
    contract: FutureContract
}

export default function ModalSellContract({
    isOpen,
    handleClose,
    contract
}: ModalSellContract) {
    const { address: account } = useAccount()
    const { execFunction, loading } = useContract()

    const [buttonEnabled, setButtonEnabled] = React.useState(false)

    const [price, setPrice] = React.useState("")

    if (!account) return <></>

    const handleUpdatePrice = async () => {
        const sellPrice = Number(price)

        if (sellPrice <= 0) {
            console.error("Value must be greather than zero")
            return
        }
    }

    const handleActivateSell = async () => {
        await execFunction(
            {
                instanceType: "future",
                functionName: "updateActive(bool)",
                contractAddress: contract.address,
                onFinish: () => {
                    placeContractSaleOrder(contract.address, {
                        ...contract,
                        price,
                        activated: true
                    })

                    writePrivateEvent(account, Date.now(), {
                        type: "sale",
                        message: "Contract sale order sent",
                        contractAddress: contract.address
                    })
                    handleClose()
                }
            },
            true
        )
    }

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Place contract for sale?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="body1">
                            Contracts for sale will appear on the "Swap" page.
                            To sell this contract, you will need update the
                            price first.
                        </Typography>
                        {buttonEnabled ? (
                            <Typography color="green">
                                Click "confirm" to make it available for sale.
                            </Typography>
                        ) : (
                            <Typography color="red">
                                The confirm button will become available after
                                updating the price
                            </Typography>
                        )}
                    </DialogContentText>

                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "end"
                        }}
                    >
                        <TextField
                            placeholder="Price"
                            sx={{ mt: 2 }}
                            size="small"
                            type="number"
                            required
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        USD
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button onClick={handleUpdatePrice}>Update</Button>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleActivateSell}
                        disabled={!buttonEnabled}
                        variant="contained"
                        color="success"
                    >
                        {loading ? (
                            <CircularProgress size={22} color="inherit" />
                        ) : (
                            "Confirm"
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
