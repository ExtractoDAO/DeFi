"use client"

import { ReactNode } from "react"

import { WagmiConfig, createConfig } from "wagmi"
import { polygon, polygonMumbai, localhost } from "wagmi/chains"

import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import daoConfig from "../../dao.config"

interface Props {
    children: ReactNode
}

const walletConnectProjectId = process.env.WALLET_CONNECT_PROJECT_ID || ""

const config = createConfig(
    getDefaultConfig({
        appName: "ExtractoDAO",
        alchemyId: process.env.ALCHEMY_ID,
        chains: [daoConfig.targetNetwork],
        walletConnectProjectId
    })
)

export default function WagmiProvider({ children }: Props) {
    return (
        <WagmiConfig config={config}>
            <ConnectKitProvider theme="auto">{children}</ConnectKitProvider>
        </WagmiConfig>
    )
}
