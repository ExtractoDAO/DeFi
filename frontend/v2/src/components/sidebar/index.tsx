// components/Sidebar.tsx
import React from "react"
import classnames from "classnames"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

import LogoDAO from "@/assets/img/logo-dao.svg"
import Image from "next/image"

import { NavItem, defaultNavItems, defaultSettingsIcons } from "./sidebarItems"
import Link from "next/link"

import { usePathname } from "next/navigation"

type Props = {
    collapsed: boolean
    setCollapsed(collapsed: boolean): void
    navItems?: NavItem[]
    settingsItems?: NavItem[]
}

const Sidebar = ({
    collapsed,
    setCollapsed,
    navItems = defaultNavItems,
    settingsItems = defaultSettingsIcons
}: Props) => {
    const pathname = usePathname()
    const Icon = collapsed ? ChevronRightIcon : ChevronLeftIcon

    return (
        <div
            className={`bg-white
                    dark:bg-deep-gray/100
                    text-zinc-50 z-20
                    max-md:fixed
                    max-md:bottom-0
                    max-md:w-full
                    dark:border-r
                    dark:border-deep-gray/200
                    border-r
                    border-gray/200
                    `}
        >
            <div
                className={classnames({
                    relative: true,
                    [`
                        flex
                        flex-col
                        justify-between
                        max-md:flex-row
                        max-md:py-0
                    `]: true,

                    "p-5 py-4": !collapsed,
                    "p-2 py-4": collapsed
                })}
            >
                <div
                    className={classnames({
                        "flex items-center": true,
                        "justify-between": !collapsed,
                        "justify-center": collapsed,
                        "max-md:hidden": true
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
                <div
                    className={`
                        w-full
                        mt-9
                        flex
                        items-center
                        border-b
                        border-b-gray/200
                        dark:border-b-deep-gray/200
                        max-md:hidden
                    `}
                />
                <button
                    style={{
                        right: "-15px"
                    }}
                    className={`
                      bg-white
                        grid
                        place-content-center
                        w-8
                        h-8
                        absolute
                        right-0
                        top-14
                        rounded-xl
                        border-2
                        border-gray/100
                        dark:bg-deep-gray/100
                        dark:border-deep-gray/200
                        max-md:hidden
                        `}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <Icon
                        className={`
                            w-5
                            h-5
                            bg-white
                            text-slate/700
                            dark:bg-deep-gray/100
                        `}
                    />
                </button>

                <nav className="flex-grow">
                    <ul
                        className={classnames({
                            [`
                                my-2
                                flex
                                flex-col
                                gap-2
                                max-md:flex-row
                                max-md:justify-center
                            `]: true,
                            "items-stretch": !collapsed,
                            "items-center": collapsed,
                            "transition-all duration-300": true
                        })}
                    >
                        <span
                            className={classnames({
                                "max-md:hidden": true,
                                "text-gray/500 text-xs font-semibold mt-6":
                                    true,
                                "text-center": collapsed,
                                "ml-5": !collapsed
                            })}
                        >
                            MAIN
                        </span>
                        {navItems.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className={classnames({
                                        [`hover:bg-slate/100
                                            flex
                                            hover:text-brand/secondary/500
                                            dark:hover:text-brand/primary/500
                                            dark:hover:bg-deep-gray/300`]: true,

                                        [`transition-colors duration-300`]:
                                            true,

                                        [`rounded-md p-2 mx-3 gap-4`]:
                                            !collapsed,

                                        [`rounded-lg
                                            p-2
                                            mx-3
                                            w-10
                                            h-10`]: collapsed,

                                        "text-brand/secondary/500 dark:text-brand/primary/500":
                                            pathname === item.href,

                                        "text-slate/700 dark:text-gray/400":
                                            pathname !== item.href
                                    })}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex gap-2"
                                    >
                                        <span>{item.icon}</span>{" "}
                                        <span>{!collapsed && item.label}</span>
                                    </Link>
                                </li>
                            )
                        })}

                        <div
                            className={`
                                w-full
                                my-6
                                flex
                                items-center
                                border-b
                                border-b-gray/200
                                dark:border-b-deep-gray/200
                                max-md:hidden
                            `}
                        />

                        <span
                            className={classnames({
                                "max-md:hidden": true,
                                "text-gray/500 text-xs font-semibold mt-6":
                                    true,
                                "text-center": collapsed,
                                "ml-5": !collapsed
                            })}
                        >
                            SETTINGS
                        </span>
                        {settingsItems.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className={classnames({
                                        [`text-slate/700
                                            hover:bg-slate/100
                                            flex
                                            hover:text-brand/secondary/500
                                            dark:hover:text-brand/primary/500
                                            dark:text-gray/400
                                            dark:hover:bg-deep-gray/300
                                        `]: true,

                                        "transition-colors duration-300": true,
                                        "rounded-md p-2 mx-3 gap-4": !collapsed,
                                        "rounded-lg p-2 mx-3 w-10 h-10":
                                            collapsed,
                                        "text-brand/secondary/500 dark:text-brand/primary/500":
                                            pathname === item.href,
                                        "text-slate/700 dark:text-gray/400":
                                            pathname !== item.href
                                    })}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex gap-2"
                                    >
                                        <span>{item.icon}</span>{" "}
                                        <span>{!collapsed && item.label}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
export default Sidebar
