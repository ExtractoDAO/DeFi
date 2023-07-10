"use client"
import classnames from "classnames"
import { ReactElement, ReactNode, useState } from "react"

interface ValueInputProps {
    label?: string
    insideElement?: {
        element: () => JSX.Element
        position?: "start" | "end"
    }
}

export default function ValueInput({ label, insideElement }: ValueInputProps) {
    const [focus, setFocus] = useState(false)
    return (
        <div
            className={classnames({
                "py-2": true,
                "px-4": true,
                "bg-slate/50": true,
                rounded: true,
                border: true,
                "border-slate/200": true,
                "dark:bg-gray/900": true,
                "dark:border-deep-gray/400": true,

                outline: focus,

                "outline-brand/secondary/400": focus,
                "dark:outline-brand/primary/400": focus,
                "border-transparent": focus
            })}
        >
            <label
                className={classnames({
                    "text-sm": true,
                    "font-medium": true,
                    "text-slate/600": true,
                    "dark:text-slate/600": true
                })}
            >
                {label}
            </label>
            <div
                className={classnames({
                    flex: true,
                    "items-center": true,
                    "flex-row": insideElement?.position === "end",
                    "flex-row-reverse": insideElement?.position === "start"
                })}
            >
                <input
                    type="text"
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    className={classnames({
                        "bg-slate/50": true,
                        "w-full": true,
                        "py-3": true,
                        "border-none": true,
                        "outline-none": true,
                        "text-slate/400": true,
                        "font-medium": true,
                        "text-xl": true,
                        "dark:bg-gray/900": true
                    })}
                />
                {insideElement && <insideElement.element />}
            </div>
        </div>
    )
}
