"use client"

import classNames from "classnames"
import React, { PropsWithChildren, useState } from "react"
import Navbar from "../navbar"
import Sidebar from "../sidebar"
import { usePathname } from "next/navigation"

const Layout = (props: PropsWithChildren) => {
    const [collapsed, setSidebarCollapsed] = useState(true)
    const pathname = usePathname()

    return (
        <div
            className={classNames({
                "grid bg-zinc-100 min-h-screen": true,
                "grid-cols-sidebar": !collapsed,
                "grid-cols-sidebar-collapsed": collapsed,
                "transition-[grid-template-columns] duration-300 ease-in-out":
                    true,
                "max-md:block": true
            })}
        >
            <Sidebar collapsed={collapsed} setCollapsed={setSidebarCollapsed} />
            <div>
                <Navbar />
                <div
                    className={classNames({
                        "p-6 max-md:px-4": !pathname?.includes("/exchange"),
                        "h-[calc(100vh-64px)]": pathname?.includes("/exchange"),
                        "box-border": pathname?.includes("/exchange"),
                        "overflow-y-scroll": pathname?.includes("/exchange"),
                        scroll: true
                    })}
                >
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout
