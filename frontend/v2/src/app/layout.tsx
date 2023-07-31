import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

import "./globals.css"

import Layout from "@/components/layout"
import { theme } from "@/utils/theme"
import WagmiProvider from "@/providers/wagmi"
export const metadata = {
    title: "ExtractoDAO",
    description: "The DeFi 2.0"
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={theme}>
            <body className={`${inter.className} bg-slate/50 dark:bg-gray/900`}>
                <WagmiProvider>
                    <Layout>{children}</Layout>
                </WagmiProvider>
            </body>
        </html>
    )
}
