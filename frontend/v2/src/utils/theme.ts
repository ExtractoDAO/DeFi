"use client"

import { getItem, setItem } from "@/lib/storage"

export const theme = getItem("THEME") || "dark"

export const switchTheme = () => {
    if (theme === "light") {
        setItem("THEME", "dark")
    } else {
        setItem("THEME", "light")
    }

    window.location.reload()
}
