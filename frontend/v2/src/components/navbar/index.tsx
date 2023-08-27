"use client"
import React, { useEffect, useState } from "react"
import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { BellIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import classNames from "classnames"
import { usePathname } from "next/navigation"
import LogoDAO from "@/assets/img/logo-dao.svg"
import Image from "next/image"

import {
    ConnectWallet,
    useAddress,
    useConnectionStatus,
    useSDK,
    useSigner
} from "@thirdweb-dev/react"

import { LockClosedIcon } from "@heroicons/react/24/outline"

import { SiweMessage } from "siwe"
import Modal from "../modal"
import { deleteItem, getItem, setItem } from "@/lib/storage"

import { toast } from "react-toastify"

import daoConfig from "../../../dao.config"
import { shortAddress } from "@/utils/mask"

import { Login } from "@/services/backend/login"
import env from "@/services/environment"

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
    const sdk = useSDK()
    const login = new Login(env)
    const address = useAddress()
    const pathname = usePathname()
    const pageTitle = pathnames[pathname || "/"]
    const connectionStatus = useConnectionStatus()
    const isConnected = connectionStatus === "connected"
    const [modalSign, setModalSign] = useState(false)
    const [showNotificationIcon, setShowNotificationIcon] = useState(false)

    useEffect(() => {
        setShowNotificationIcon(isConnected)
    }, [isConnected])

    useEffect(() => {
        if (!isConnected) {
            deleteItem("LOGIN_SIGNATURE")
        }
    }, [isConnected])

    useEffect(() => {
        const savedSign = getItem("LOGIN_SIGNATURE")
        if (isConnected && address && !savedSign) {
            setModalSign(true)
        } else {
            setModalSign(false)
        }
    }, [isConnected, address])

    const sign = async () => {
        if (address && sdk?.wallet.sign) {
            login.signIn({
                address,
                signMessage: (message: string) => sdk?.wallet.sign(message)
            })
        }
    }

    const ButtonConect = () => (
        <ConnectWallet
            className={classNames(
                "flex",
                "dark:text-gray/300",
                "text-sm",
                "not-italic",
                "font-medium",
                "text-gray/900",
                "border",
                "border-gray/200",
                "py-2",
                "px-6",
                "justify-center",
                "items-center",
                "rounded",
                "gap-3",
                "leading-6",
                "dark:bg-deep-gray/200"
            )}
            detailsBtn={() => {
                return (
                    <button
                        className={classNames(
                            "flex",
                            "dark:text-gray/300",
                            "text-sm",
                            "not-italic",
                            "font-medium",
                            "text-gray/900",
                            "py-2",
                            "px-6",
                            "justify-center",
                            "items-center",
                            "rounded",
                            "gap-3",
                            "leading-6",
                            "dark:bg-deep-gray/200"
                        )}
                    >
                        {address ? shortAddress(address) : ""}
                    </button>
                )
            }}
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
                        label: "Sign",
                        onClick: () => sign(),
                        bgColor: "success"
                    },
                    {
                        label: "Cancel",
                        onClick: async () => {
                            setModalSign(false)
                        },
                        bgColor: "secondary"
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
