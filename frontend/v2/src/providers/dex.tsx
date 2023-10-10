"use client"
import { ReactNode } from "react"
import { DexProvider } from "@/context"

export const Providers = ({ children }: { children: ReactNode }) => {
    return <DexProvider>{children}</DexProvider>
}
