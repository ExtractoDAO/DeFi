"use client"

import classNames from "classnames"
import React, { PropsWithChildren, useState } from "react"
import Navbar from "../navbar"
import Sidebar from "../sidebar"

const Layout = (props: PropsWithChildren) => {
    const [collapsed, setSidebarCollapsed] = useState(true)
    const [showSidebar, setShowSidebar] = useState(true)
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
                <Navbar/>
                {props.children}
            </div>
        </div>
    )
}

export default Layout
