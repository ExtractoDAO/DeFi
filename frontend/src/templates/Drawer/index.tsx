import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material"

import Header from "components/Header"
import SidebarLastUpdates from "components/SidebarLastUpdates"

import ContractCard from "components/ContractCard"

import { useEffect, useState } from "react"

import { useAccount } from "wagmi"
import { ConnectKitButton } from "connectkit"

import { FutureContract } from "types/DAO"
import { onValue, ref } from "firebase/database"
import { network } from "config/settings"

// import { useQuery, gql } from "@apollo/client"

import { LOAD_DRAWER } from "services/graphQl/queries"

import { database } from "services/firebase"
import { firebaseLogin } from "services/firebase/contracts"
import { getCurrentBlock } from "utils/convert"
const db = database

export default function WalletTemplate() {
    const { address: account, isConnected } = useAccount()

    // const { data } = useQuery(LOAD_DRAWER, {
    //     variables: {
    //         investor: account
    //     }
    // })

    const [fullDrawer, setFullDrawer] = useState<FutureContract[] | null>(null)

    const [blockHeight, setBlockHeight] = useState(0)

    const [saleList, setSaleList] = useState([""])

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    useEffect(() => {
        async function getBlockHeight() {
            setBlockHeight(await getCurrentBlock())
        }

        getBlockHeight()
    }, [])

    const getFirebaseTransactionList = async (investorAccount: string) => {
        try {
            firebaseLogin()
            onValue(ref(db, `${network}-drawer`), (snapshot) => {
                if (snapshot.val()) {
                    const res: FutureContract[] = Object.values(snapshot.val())

                    if (res.length) {
                        const arr = res
                            .filter(
                                (item) =>
                                    BigInt(item?.investor) ===
                                    BigInt(investorAccount)
                            )
                            .filter((item) => !item.withdrawn)
                        setFullDrawer(arr)
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getContractsForSale = (investorAccount: string) => {
        try {
            onValue(ref(db, `${network}-contractsForSale`), (snapshot) => {
                if (snapshot.val()) {
                    const res: FutureContract[] = Object.values(snapshot.val())
                    const arr: string[] = []

                    if (res.length) {
                        res.map((item) => {
                            if (
                                BigInt(item?.investor) ===
                                BigInt(investorAccount)
                            ) {
                                arr.push(item.address)
                            }
                        })
                        setSaleList(arr)
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (account) {
            getContractsForSale(account?.toString())
            getFirebaseTransactionList(account?.toString())
        }
    }, [account])

    if (!isConnected) {
        return (
            <>
                <Header />
                <div
                    style={{
                        width: "100%",
                        height: "80vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <ConnectKitButton />
                </div>
            </>
        )
    }

    return (
        <>
            <Header />

            <Container sx={{ mt: 5, background: "#f1f1f1" }}>
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <Grid container>
                            <Typography
                                variant="h2"
                                component="h2"
                                align="center"
                                style={{ width: "100%" }}
                            >
                                Drawer
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mt: 2
                            }}
                        >
                            {fullDrawer === null ? (
                                <Typography>
                                    Your drawer is empty. Click{" "}
                                    <a href="/buy">here</a> to invest in future
                                    contracts. contracts.
                                </Typography>
                            ) : (
                                fullDrawer.map((contract) => {
                                    const active = saleList.includes(
                                        contract.address
                                    )
                                    return (
                                        <ContractCard
                                            active={active}
                                            key={contract.address}
                                            contract={contract}
                                            currentBlock={blockHeight}
                                        />
                                    )
                                })
                            )}
                        </Grid>
                    </Grid>

                    <Grid item md={4}>
                        <SidebarLastUpdates />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
