import React, { useState } from "react"
import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { BellIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import classNames from "classnames"
import { usePathname } from "next/navigation"
import LogoDAO from "@/assets/img/logo-dao.svg"
import Image from "next/image"

import { theme } from "@/utils/theme"
import { setItem } from "@/lib/storage"

import { ConnectKitButton, Avatar, useModal, SIWEButton } from "connectkit"
import { useAccount } from "wagmi"

const pathnames: Dictionary = {
    "/": "Dashboard",
    "/buy": "Buy contracts",
    "/drawer": "Drawer",
    "/exchange": "Exchange"
}

export default function Navbar() {
    const pathname = usePathname()
    const pageTitle = pathnames[pathname || "/"]
    const { address, isConnected } = useAccount()
    // const {  } = useModal()

    const onConnect = () =>
        fetch("/api/login")
            .then(() => {
                const token = "abc123xyz"
                setItem("token", token)
            })
            .catch((e) => console.error(e))

    // const PhotoProfile = () => (
    //     <Avatar radius={50} address={address} size={32} />
    // )

    // const ButtonConect = () => <ConnectKitButton theme={theme === "dark" ? "midnight" : "auto"} showAvatar={false} />
    const ButtonConect = () => (
        <ConnectKitButton
            theme={theme === "dark" ? "midnight" : "auto"}
            showAvatar={true}
        />
    )

    return (
        <React.Fragment>
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
                                className={classNames(
                                    "flex",
                                    "px-3",
                                    "py-2.5",
                                    "items-center",
                                    {
                                        hidden: isConnected === false
                                    }
                                )}
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
                                className={classNames(
                                    "flex",
                                    "px-3",
                                    "py-2.5",
                                    "items-center",
                                    { "max-md:hidden": true }
                                )}
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
