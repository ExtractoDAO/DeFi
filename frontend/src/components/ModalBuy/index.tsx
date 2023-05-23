import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"

import DialogTitle from "@mui/material/DialogTitle"
import BuyContracts from "components/BuyContracts"

type Payment = "USDT" | "USDC" | "BUSD" | "DAI" | ""

interface DialogProps {
    open: boolean
    handleClockClose: () => void
    payment: Payment
}

export default function ModalBuy({
    handleClockClose,
    open,
    payment
}: DialogProps) {
    return (
        <Dialog
            open={open}
            onClose={handleClockClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Buy contract</DialogTitle>
            <DialogContent>
                <BuyContracts payment={payment} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClockClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
