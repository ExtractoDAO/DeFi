import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

interface DialogProps {
    open: boolean
    handleClockClose: () => void
    title: string
    description?: string
    buttonLabel?: string
}

export default function AlertDialog({
    handleClockClose,
    open,
    title,
    description,
    buttonLabel = "OK"
}: DialogProps) {
    return (
        <Dialog
            open={open}
            onClose={handleClockClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClockClose} autoFocus>
                    {buttonLabel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
