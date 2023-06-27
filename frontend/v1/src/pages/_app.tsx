import "../styles/globals.css"
import type { AppProps } from "next/app"

import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react"

import theme from "styles/global"
import { ThemeProvider } from "@mui/material"
import AlertDialog from "components/Alert"
import { useEffect, useState } from "react"

import { ethers } from "ethers"
import { network } from "config/settings"

import { ToastContainer } from "react-toastify"

import { ApolloProvider } from "@apollo/client"
import { client as clientAppolo } from "services/graphQl"

import "react-toastify/dist/ReactToastify.css"

// the chainId our app wants to be running on
// for our example the Polygon Mumbai Testnet
const desiredChainId = ChainId.Mumbai

import { WagmiConfig, createClient } from "wagmi"
import { polygon, localhost, polygonMumbai } from "wagmi/chains"
import { ConnectKitProvider, getDefaultClient } from "connectkit"

localhost.id = 31337

const networks =
    process.env.NETWORK === "mainnet"
        ? [polygon]
        : process.env.NETWORK === "testnet"
        ? [polygonMumbai]
        : [polygon, polygonMumbai, localhost]

const client = createClient(
    getDefaultClient({
        appName: "ExtractoDAO",
        alchemyId: process.env.ALCHEMY_ID,
        chains: networks
    })
)

function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={clientAppolo}>
            <ThirdwebProvider desiredChainId={desiredChainId}>
                <ThemeProvider theme={theme}>
                    <WagmiConfig client={client}>
                        <ConnectKitProvider theme="auto">
                            <div>
                                <Component {...pageProps} />

                                <ToastContainer />
                            </div>
                        </ConnectKitProvider>
                    </WagmiConfig>
                </ThemeProvider>
            </ThirdwebProvider>
        </ApolloProvider>
    )
}

export default App
