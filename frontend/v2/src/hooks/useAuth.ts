import { useEffect, useState } from "react"

import { usePathname } from "next/navigation"

import { useAddress, useConnectionStatus, useSDK } from "@thirdweb-dev/react"

import { deleteItem, getItem, setItem } from "@/services/storage"

import { Login } from "@/services/backend/login"
import env from "@/services/environment"
import AxiosService from "@/services/axios"

import { Backend } from "@/services/backend/backend"

const pathnames: Dictionary = {
    "/": "Dashboard",
    "/buy": "Buy contracts",
    "/drawer": "Drawer",
    "/exchange": "Exchange"
}

const useAuth = () => {
    const savedToken = getItem("TOKEN")
    const sdk = useSDK()

    const backend = new Backend(env, new AxiosService(env))
    const login = new Login(env, new AxiosService(env))
    const address = useAddress()
    const pathname = usePathname()
    const pageTitle = pathnames[pathname || "/"]
    const connectionStatus = useConnectionStatus()
    const [isConnected, setIsConnected] = useState(false)
    const [modalSign, setModalSign] = useState(false)
    const [showNotificationIcon, setShowNotificationIcon] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const oldState = isConnected
        const newState = connectionStatus === "connected"

        if (oldState === true && newState === false) {
            signout()
        }

        setIsConnected(newState)
        setShowNotificationIcon(newState)
    }, [connectionStatus])

    function hasExpired(expirationTimestamp: number) {
        const currentTimestamp = Math.floor(Date.now() / 1000) // Obtém o timestamp atual em segundos
        return currentTimestamp >= expirationTimestamp
    }

    useEffect(() => {
        const newState = connectionStatus === "connected"

        const tokenExp = getItem("TOKEN_EXPIRES_AT")
        if (tokenExp) {
            if (hasExpired(Number(tokenExp))) {
                console.log("ERASE TOKEN")
            }
        }

        if (newState && address && !savedToken) {
            setModalSign(true)
        }
    }, [address, connectionStatus])

    const signout = async () => {
        if (!address || !savedToken || !sdk?.wallet.sign) {
            return
        }

        const isSuccess = await login.signOut({
            address
        })

        if (isSuccess) {
            deleteItem("TOKEN")
            deleteItem("TOKEN_EXPIRES_AT")
        }
    }

    const sign = async () => {
        if (address && sdk?.wallet.sign) {
            setLoading(true)
            const { token, expirationTime } = await backend.login.signIn({
                address,
                signMessage: (message: string) => sdk?.wallet.sign(message)
            })

            setModalSign(false)

            if (token) {
                setItem("TOKEN", token)
                setItem("TOKEN_EXPIRES_AT", expirationTime)
            }
            setLoading(false)
        }
    }

    return {
        sign,
        pageTitle,
        modalSign,
        showNotificationIcon,
        loading,
        address,
        setModalSign
    }
}

export default useAuth
