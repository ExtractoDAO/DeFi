import React, { useState } from "react"
import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { BellIcon } from "@heroicons/react/24/outline"

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
                className="text-gray/900
                border
                py-2.5
                px-3
                rounded-lg
              border-gray/200"
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
                    border
                  border-gray/200
                    rounded-full
                    h-8"
            ></div>
        </>
    )
}

export default function Navbar({ onMenuButtonClick }: Props) {
    const [isConnected, setIsConnected] = useState(true)

    return (
        <React.Fragment>
            <nav
                className="bg-white 
                  dark:bg-gray/900
                    border
                    border-gray/200
                    flex
                    items-center
                    w-screen   
                    md:w-full
                    z-10 
                    pl-6
                    pr-6
                    h-[64px] 
                    top-0"
            >
                <div>
                    <div
                        className="text-gray/600
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
                    <Cog8ToothIcon
                        className="w-6 
                          h-6
                          mr-3
                        text-slate/700"
                    />
                    {isConnected ? (
                        <>
                            <BellIcon
                                className="w-6 
                                    h-6
                                    mr-3
                                  text-slate/700"
                            />

                            <PhotoProfile />
                        </>
                    ) : (
                        <ButtonConect />
                    )}
                </div>
            </nav>
        </React.Fragment>
    )
}
