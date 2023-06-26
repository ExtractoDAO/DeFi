import {
    Avatar,
    Box,
    Container,
    ListItemAvatar,
    Typography
} from "@mui/material"
import { useEffect, useState } from "react"

import { onValue, ref } from "firebase/database"
import { network } from "config/settings"
import { firebaseLogin } from "services/firebase/contracts"

import { database } from "services/firebase"

const db = database

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

import { addrFormatter } from "utils/format"

import BuyIcon from "@mui/icons-material/ShoppingCart"
import PriceIcon from "@mui/icons-material/Sell"
import SellIcon from "@mui/icons-material/CurrencyExchange"
import WithdrawIcon from "@mui/icons-material/Payments"

import { Event } from "services/firebase/events"

import { useAccount } from "wagmi"

const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper"
}

const Icon = ({ type }: { type: string }) => {
    switch (type) {
        case "buy":
            return <BuyIcon />
        case "updatePrice":
            return <PriceIcon />
        case "sale":
            return <SellIcon />
        case "withdraw":
            return <WithdrawIcon />

        default:
            return <></>
    }
}

export default function SidebarLastUpdates() {
    const { address: account } = useAccount()
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        try {
            firebaseLogin()
            if (!account) return
            onValue(
                ref(db, `${network}-private-events/${account}`),
                (snapshot) => {
                    const res: {
                        [key: string]: {
                            contractAddress: string
                            message: string
                            type: string
                        }
                    } = snapshot.val()

                    if (!res) return

                    const output = Object.entries(res)
                        .sort((a, b) => Number(b[0]) - Number(a[0]))
                        .map(([key, value]) => ({ key, ...value }))

                    const arr: any[] = Object.values(output)
                    setEvents(arr)
                }
            )
        } catch (error) {
            console.log(error)
        }
    }, [account])

    return (
        <Container>
            <Typography variant="h2" textAlign={"center"}>
                Last updates
            </Typography>
            <Box
                sx={{
                    backgroundColor: "#fff",
                    border: "solid 1px #c4c4c4",
                    padding: "14px",
                    borderRadius: "10px",
                    height: "100%",
                    maxHeight: "600px",
                    overflowY: "scroll",
                    my: 2,

                    ["&::-webkit-scrollbar"]: {
                        width: 0
                    }
                }}
            >
                <List sx={style} component="nav" aria-label="mailbox folders">
                    {events.length === 0 ? (
                        <div>
                            <Typography variant="body1">
                                No notifications
                            </Typography>
                        </div>
                    ) : (
                        events.map((event, index) => {
                            return (
                                <ListItem key={index} divider>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Icon type={event.type} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={event.message}
                                        secondary={
                                            event.contractAddress
                                                ? addrFormatter(
                                                      event.contractAddress
                                                  )
                                                : ""
                                        }
                                    />
                                </ListItem>
                            )
                        })
                    )}
                </List>
            </Box>
        </Container>
    )
}
