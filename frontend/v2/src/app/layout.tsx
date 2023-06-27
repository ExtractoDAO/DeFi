import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

import "./globals.css"

import Layout from "@/components/layout"
export const metadata = {
    title: "ExtractoDAO",
    description: "The DeFi 2.0"
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const theme = "light"

    return (
        <html lang="en" className={theme}>
            <body
                className={`${inter.className} bg-slate/50 dark:bg-Default/gray/900`}
            >
                <Layout>{children}</Layout>
            </body>
        </html>
    )
}
