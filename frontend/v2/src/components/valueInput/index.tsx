import classnames from "classnames"
import { ReactElement, ReactNode } from "react"

interface ValueInputProps {
    label?: string
    insideElement?: {
        element: () => JSX.Element
        position?: "start" | "end"
    }
}

export default function ValueInput({ label, insideElement }: ValueInputProps) {
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
                "dark:border-deep-gray/400": true
            })}
        >
            <label
                className={classnames({
                    "text-sm": true,
                    "font-medium": true,
                    "text-slate/600": true
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
