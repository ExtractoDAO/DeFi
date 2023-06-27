// components/Sidebar.tsx
import React from "react"
import cn from "classnames"
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from "@heroicons/react/24/outline"
// 👇 props to get and set the collapsed state from parent component
type Props = {
    collapsed: boolean
    setCollapsed(collapsed: boolean): void
}
const Sidebar = ({ collapsed, setCollapsed }: Props) => {
    // 👇 use the correct icon depending on the state.
    const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon
    return (
        <div
            className={cn({
                "bg-white text-zinc-50 z-20": true
            })}
        >
            <div
                className={cn({
                    "flex flex-col justify-between": true
                })}
            >
                {/* logo and collapse button */}
                <div
                    className={cn({
                        "flex items-center border-b border-b-indigo-800": true,
                        "p-4 justify-between": !collapsed,
                        "py-4 justify-center": collapsed
                    })}
                >
                    {!collapsed && (
                        <span className="whitespace-nowrap">My Logo</span>
                    )}
                    <button
                        className={cn({
                            "grid place-content-center": true, // position
                            "hover:bg-indigo-800 ": true, // colors
                            "w-10 h-10 rounded-full": true // shape
                        })}
                        // 👇 set the collapsed state on click
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <Icon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Sidebar
