"use client"
import { ReactNode, useState } from "react"
import classNames from "classnames"
import { Bars3Icon } from "@heroicons/react/24/outline"

interface SidebarProps {
    children: ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
    const [collapsed, setSidebarCollapsed] = useState(true)

    return (
        <div
            className={classNames({
                // 👇 use grid layout
                "grid min-h-screen": true,
                // 👇 toggle the width of the sidebar depending on the state
                "grid-cols-sidebar": !collapsed,
                "grid-cols-sidebar-collapsed": collapsed,
                // 👇 transition animation classes
                "transition-[grid-template-columns] duration-300 ease-in-out":
                    true
            })}
        >
            <div className="bg-white text-gray/500">
                <button onClick={() => setSidebarCollapsed((prev) => !prev)}>
                    <Bars3Icon className="w-10 h-10" />
                </button>
            </div>
            {children}
        </div>
    )
}
