import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

import "./globals.css"
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"
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
                <Sidebar>
                    <Navbar>{children}</Navbar>
                </Sidebar>
            </body>
        </html>
    )
}
