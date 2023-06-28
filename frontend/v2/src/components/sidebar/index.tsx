// components/Sidebar.tsx
import React from "react"
import classnames from "classnames"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

import LogoDAO from "@/assets/img/logo-dao.svg"
import Image from "next/image"

// 👇 props to get and set the collapsed state from parent component
type Props = {
    collapsed: boolean
    setCollapsed(collapsed: boolean): void
}

const Sidebar = ({ collapsed, setCollapsed }: Props) => {
    // 👇 use the correct icon depending on the state.
    const Icon = collapsed ? ChevronRightIcon : ChevronLeftIcon

    return (
        <div className={"bg-white text-zinc-50 z-20"}>
            <div
                className={classnames({
                    relative: true,
                    "flex flex-col justify-between": true,
                    "p-5 py-4": !collapsed,
                    "p-2 py-4": collapsed
                })}
            >
                {/* logo and collapse button */}
                <div
                    className={classnames({
                        "flex items-center": true,
                        "justify-between": !collapsed,
                        "justify-center": collapsed
                    })}
                >
                    <span className="whitespace-nowrap">
                        <Image
                            src={LogoDAO.src}
                            alt="Logo"
                            width={60}
                            height={20}
                        />
                    </span>
                </div>
                <div className="w-full mt-9 flex items-center border-b border-b-gray/200" />
                <button
                    style={{
                        right: "-15px"
                    }}
                    className={
                        "bg-white grid place-content-center w-8 h-8 absolute right-0 top-14 rounded-xl border-2 border-gray/100"
                    }
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <Icon className="w-5 h-5 bg-white text-slate/700" />
                </button>
            </div>
        </div>
    )
}
export default Sidebar
