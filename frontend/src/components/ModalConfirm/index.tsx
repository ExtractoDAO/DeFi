import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

interface ModalConfirm {
    isOpen: boolean
    message: string
    title: string
    handleConfirm: () => void
    handleClose: () => void
}

export default function ModalConfirm({
    isOpen,
    message,
    title,
    handleConfirm,
    handleClose
}: ModalConfirm) {
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleConfirm}
                        variant="contained"
                        color="success"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
