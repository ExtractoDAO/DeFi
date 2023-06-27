import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal,
    Typography
} from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"

interface ModalDeploy {
    open: boolean
    hash: string
}

export default function ModalDeployContract({ open, hash }: ModalDeploy) {
    const [message, setMessage] = useState("Deploying contract...")
    const messages = [
        "Deploying contract...",
        "This may take a  minute...",
        "Send transaction..."
    ]

    useEffect(() => {
        setTimeout(() => {
            const rand = Math.floor(Math.random() * 3)
            setMessage(messages[rand])
        }, 2000)
    })

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" textAlign="center">
                Deploying transaction
            </DialogTitle>

            <DialogContent>
                <Box
                    sx={{ py: 3 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CircularProgress color="error" />
                </Box>
                <DialogContentText
                    id="alert-dialog-description"
                    textAlign="center"
                >
                    Your transaction is beeing deployied at tx{" "}
                    <a
                        target="_blank"
                        style={{ color: "#ca6938" }}
                        href={`https://polygonscan.com/tx/${hash}`}
                    >
                        {hash}
                    </a>
                    . Do not close this tab or reload until the process is
                    complete.
                </DialogContentText>

                <DialogContentText
                    id="alert-dialog-description"
                    textAlign="center"
                    sx={{ mt: 1 }}
                >
                    {message}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}
