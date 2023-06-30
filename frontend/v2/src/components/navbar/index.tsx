import React, { useState } from "react"
import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { BellIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

type Props = {
    /**
     * Allows the parent component to modify the state when the
     * menu button is clicked.
     */
    onMenuButtonClick(): void
}

const ButtonConect = () => {
    return (
        <>
            <button
                className="dark:text-gray/300
                text-sm
                not-italic
                font-medium
                text-gray/900
                border
                border-gray/200
                py-2
                px-4
                justify-center
                items-center
                rounded
                gap-3"
            >
                Connect
            </button>
        </>
    )
}

const PhotoProfile = () => {
    return (
        <>
            <div
                className="w-8
                    h-8
                    flex
                    justify-center
                    items-center
                    border
                  border-gray/200
                    rounded-full
                    "
            ></div>
        </>
    )
}

export default function Navbar({ onMenuButtonClick }: Props) {
    const [isConnected, setIsConnected] = useState(false)

    return (
        <React.Fragment>
            <nav
                className="bg-white 
                  dark:border-deep-gray/200
                  dark:bg-gray/900 
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
                    className="flex
                    justify-between
                    items-center
                    self-stretch
                "
                >
                    <div>
                        <div
                            className="text-gray/600
                            font-medium
                          dark:text-gray/600
                            w-[110px]
                            text-xl/medium"
                        >
                            Admin Panel
                        </div>
                    </div>
                    <div
                        className="flex
                        w-full
                        items-center
                        justify-end
                        "
                    >
                        <Link
                            href={""}
                            className=" flex
                        px-3
                        py-2.5
                        gap-3
                        "
                        >
                            <Cog8ToothIcon
                                className="w-5
                                    h-5
                                    mr-3
                                    text-gray/400"
                            />
                        </Link>
                        {isConnected ? (
                            <>
                                <Link
                                    href={""}
                                    className=" flex
                                         px-3
                                         py-2.5
                                        "
                                >
                                    <BellIcon
                                        className="w-6
                                    h-6
                                    mr-3
                                    text-gray/400"
                                    />
                                </Link>
                                <PhotoProfile />
                            </>
                        ) : (
                            <ButtonConect />
                        )}
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}
