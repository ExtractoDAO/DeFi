import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import COW from "assets/images/stablecoins/COW.png"

interface IModalWithdraw {
    isOpen: boolean
    handleConfirm: () => void
    handleClose: () => void
}

export default function ModalWithdraw({
    isOpen,
    handleConfirm,
    handleClose
}: IModalWithdraw) {
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirm withdraw?
                </DialogTitle>

                <DialogContent>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingBottom: "20px"
                        }}
                    >
                        <img
                            src={COW.src}
                            style={{
                                maxWidth: "80px"
                            }}
                        />
                    </div>

                    <DialogContentText id="alert-dialog-description">
                        When confirming the withdrawal, your contract will be
                        burned and you will receive the corresponding amount in
                        COW in your wallet. COW is a USD-backed stablecoin, at
                        10:1 parity (1 COW = $0.10). After withdrawal, you can
                        trade your COW in the{" "}
                        <a
                            href="https://#"
                            target="_blank"
                            style={{ color: "#ca6938" }}
                        >
                            liquidity pool
                        </a>{" "}
                        .
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
