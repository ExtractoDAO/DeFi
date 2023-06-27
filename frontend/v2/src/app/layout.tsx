import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

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
        <html lang="en" className="dark">
            <body
                className={`${inter.className} bg-slate/50 dark:bg-Default/gray/900`}
            >
                {children}
            </body>
        </html>
    )
}
