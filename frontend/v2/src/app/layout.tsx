import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

import "./globals.css"

import Layout from "@/components/layout"
import { theme } from "@/utils/theme"

import { ThirdwebProvider } from "@/providers/Thirdweb"

export const metadata = {
    title: "ExtractoDAO",
    description: "The DeFi 2.0"
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    // thirdwebsecret = "Qs-BcgYakeFuRu35xTzHZ9TlB0vVRk4Vc7SL-KnaXTMVRktUqnhdvnULNlsI-P6uEZmmxw5lIYw9ybHfKDlLqw"

    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-slate/50 dark:bg-gray/900`}>
                <ThirdwebProvider
                    activeChain="localhost"
                    clientId="f05daca94bc43cf8e5d93fe257fd68e8"
                >
                    <Layout>{children}</Layout>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </ThirdwebProvider>
            </body>
        </html>
    )
}
