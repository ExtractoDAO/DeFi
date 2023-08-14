import React, { useEffect, useState } from "react"
import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { BellIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import classNames from "classnames"
import { usePathname } from "next/navigation"
import LogoDAO from "@/assets/img/logo-dao.svg"
import Image from "next/image"

import { theme } from "@/utils/theme"

import { ConnectKitButton } from "connectkit"
import { useAccount, useSignMessage } from "wagmi"

import { LockClosedIcon } from "@heroicons/react/24/outline"

import { SiweMessage } from "siwe"
import Modal from "../modal"
import { deleteItem, getItem, setItem } from "@/lib/storage"

import { toast } from "react-toastify"

import daoConfig from "../../../dao.config"

const pathnames: Dictionary = {
    "/": "Dashboard",
    "/buy": "Buy contracts",
    "/drawer": "Drawer",
    "/exchange": "Exchange"
}

const messagePlainText = process.env.SIWE_STATEMENT?.toString()
const domain = process.env.DOMAIN?.toString()
const chainId = daoConfig.targetNetwork.id

export default function Navbar() {
    const pathname = usePathname()
    const pageTitle = pathnames[pathname || "/"]
    const { address, isConnected, connector } = useAccount()
    const [modalSign, setModalSign] = useState(false)
    const [showNotificationIcon, setShowNotificationIcon] = useState(false)

    const {
        signMessage,
        data: signature,
        isError,
        isSuccess
    } = useSignMessage()

    useEffect(() => {
        setShowNotificationIcon(isConnected)
    }, [isConnected])

    async function fetchSaveSignature() {
        try {
            if (signature && isSuccess && isConnected) {
                const res = await fetch(`/api/auth/signin?address=${address}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: process.env.SIWE_STATEMENT,
                        signature: signature
                    })
                })

                const formatMessage = await res.json()

                toast.success("Login successfully")
                setItem("LOGIN_SIGNATURE", signature?.toString())
                setModalSign(false)
            }
        } catch (e) {
            console.log(e)
            toast.error("Error while sending signature. Please try again.")
        }
    }

    useEffect(() => {
        fetchSaveSignature()

        if (isError) {
            // Add error message
        }
    }, [signature, isError])

    useEffect(() => {
        if (!isConnected) {
            deleteItem("LOGIN_SIGNATURE")
        }
    }, [isConnected])

    useEffect(() => {
        const savedSign = getItem("LOGIN_SIGNATURE")
        if (isConnected && address && !savedSign) {
            // setModalSign(true)
        } else {
            setModalSign(false)
        }
    }, [isConnected, address])

    async function createSiweMessage() {
        try {
            const nonce = await fetch(`/api/auth/nonce?address=${address}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const res = await nonce.json()

            const message = new SiweMessage({
                domain,
                address,
                statement: messagePlainText,
                uri: origin,
                version: "1",
                chainId: chainId,
                nonce: res.nonce
            })

            return message.prepareMessage()
        } catch (e) {
            console.error(e)
        }
    }

    const sign = async () => {
        const message = await createSiweMessage()
        if (!message) return
        return signMessage({
            message
        })
    }

    const ButtonConect = () => (
        <ConnectKitButton
            theme={theme === "dark" ? "midnight" : "auto"}
            showAvatar={true}
        />
    )

    return (
        <React.Fragment>
            <Modal
                message="ExtractoDAO uses a signed message to authenticate users. Click in the button bellow and sign the requested message with your wallet."
                open={modalSign}
                title="Secure Login"
                iconBgColor="bg-green/500"
                icon={<LockClosedIcon />}
                buttons={[
                    {
                        label: "Cancel",
                        onClick: async () => {
                            await connector?.disconnect()
                            setModalSign(false)
                        },
                        bgColor: "secondary"
                    },
                    {
                        label: "Sign",
                        onClick: () => sign(),
                        bgColor: "success"
                    }
                ]}
            />

            <nav
                className="bg-base/white
                  dark:border-deep-gray/200
                  dark:bg-deep-gray/100
                    border
                  border-gray/200
                    shrink-0
                    flex
                    flex-col
                    items-center
                    justify-center
                    w-screen
                    md:w-full
                    gap-2.5
                    pl-6
                    pr-6
                    h-[64px]
                    "
            >
                <div
                    className={classNames(
                        "flex",
                        "justify-between",
                        "items-center",
                        "self-stretch"
                    )}
                >
                    <div
                        className={classNames("hidden", {
                            "max-md:block": true
                        })}
                    >
                        <Image
                            src={LogoDAO.src}
                            alt="Logo"
                            width={48}
                            height={15.987}
                        />
                    </div>
                    <div
                        className={classNames(
                            "text-gray/600",
                            "font-medium",
                            "dark:text-gray/600",
                            "w-[110px]",
                            "text-xl/medium",
                            "not-italic",
                            "leading-normal",
                            { "max-md:hidden": true }
                        )}
                    >
                        {pageTitle}
                    </div>
                    <div
                        className="flex
                        items-center
                        gap-[12px]
                        "
                    >
                        <div
                            className="items-center
                                flex
                                "
                        >
                            <Link
                                href={""}
                                className={classNames({
                                    flex: true,
                                    "px-3": true,
                                    "py-2.5": true,
                                    "items-center": true,
                                    hidden: !showNotificationIcon,
                                    block: showNotificationIcon
                                })}
                            >
                                <BellIcon
                                    className="w-6
                                    h-6
                                    text-gray/400
                                    "
                                />
                            </Link>
                            <Link
                                href={""}
                                className={classNames({
                                    flex: true,
                                    "px-3": true,
                                    "py-2.5": true,
                                    "items-center": true,
                                    "max-md:hidden": true
                                })}
                            >
                                <Cog8ToothIcon
                                    className="w-6
                                    h-6
                                    text-gray/400
                                    "
                                />
                            </Link>
                        </div>
                        {/* {isConnected && <PhotoProfile />} */}
                        <ButtonConect />
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}
