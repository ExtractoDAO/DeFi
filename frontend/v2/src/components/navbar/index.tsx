import React, { ReactNode } from "react"
import { Bars3Icon } from "@heroicons/react/24/outline"
import classNames from "classnames"

interface NavbarProps {
    children: ReactNode
}

export default function Navbar({ children }: NavbarProps) {
    return (
        <React.Fragment>
            <nav
                className={classNames({
                    "bg-white text-zinc-500": true, // colors
                    "flex items-center": true, // layout
                    "w-screen md:w-full sticky z-10 px-4 shadow-sm h-[73px] top-0 ":
                        true //positioning & styling
                })}
            >
                <div className="font-bold text-lg">Admin Panel</div>
                <div className="flex-grow"></div>
                <button className="md:hidden">
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </nav>
            {children}
        </React.Fragment>
    )
}
