import * as React from "react"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

import ListItemText from "@mui/material/ListItemText"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import { ERC20Token } from "types/tokens"

import settings from "config/settings"

const tokens: string[] = Object.keys(settings.getTokens)

export interface SimpleDialogProps {
    open: boolean
    selectedValue: string
    onClose: (value: string) => void
    // setSelectedItem: React.Dispatch<React.SetStateAction<string>>
}

export default function TokenSelector(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props

    const handleClose = () => {
        onClose(selectedValue)
    }

    const handleListItemClick = (value: string) => {
        onClose(value)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set payment method</DialogTitle>
            <List sx={{ pt: 0 }}>
                {tokens.map((token) => (
                    <ListItem
                        button
                        id={token}
                        onClick={() => handleListItemClick(token)}
                        key={token}
                        sx={{ textAlign: "center" }}
                    >
                        <ListItemText primary={token} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    )
}
