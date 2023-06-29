// components/defaultNavItems.tsx
import React from "react"
import {
    HomeIcon,
    Cog8ToothIcon,
    DocumentTextIcon,
    RectangleStackIcon,
    ArrowTrendingUpIcon
} from "@heroicons/react/24/outline"
// define a NavItem prop

export type NavItem = {
    label: string
    href: string
    icon: React.ReactNode
}

export const defaultNavItems: NavItem[] = [
    {
        label: "Dashboard",
        href: "/",
        icon: <HomeIcon className="w-6 h-6" />
    },
    {
        label: "Buy contracts",
        href: "/buy",
        icon: <DocumentTextIcon className="w-6 h-6" />
    },
    {
        label: "Drawer",
        href: "/drawer",
        icon: <RectangleStackIcon className="w-6 h-6" />
    },
    {
        label: "Exchange",
        href: "/exchange",
        icon: <ArrowTrendingUpIcon className="w-6 h-6" />
    }
]

export const defaultSettingsIcons: NavItem[] = [
    {
        label: "Settings",
        href: "/",
        icon: <Cog8ToothIcon className="w-6 h-6" />
    }
]
