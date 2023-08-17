"use client"
import classnames from "classnames"
import { ReactElement, ReactNode, useState } from "react"

interface ValueInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    insideElement?: {
        element: () => JSX.Element
        position?: "start" | "end"
    }
    showMaxButton?: boolean
    labelRightContent?: string
    conversion?: {
        value: string
        variation?: string
    }
}

export default function ValueInput({
    label,
    insideElement,
    showMaxButton,
    labelRightContent,
    conversion,
    value = "",
    ...props
}: ValueInputProps) {
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
            <div className="flex justify-between items-center">
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
                <span className="text-gray/500 text-sm">
                    {labelRightContent}
                </span>
            </div>
            <div
                className={classnames({
                    flex: true,
                    "items-center": true,
                    "flex-row": insideElement?.position === "end",
                    "flex-row-reverse": insideElement?.position === "start",
                    "justify-between": true,
                    "py-1": true,
                    "h-14": true
                })}
            >
                <div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            value={value}
                            {...props}
                            maxLength={16}
                            style={
                                showMaxButton
                                    ? {
                                          width: `${
                                              value?.toString().length + 2
                                          }ch`
                                      }
                                    : undefined
                            }
                            className={classnames({
                                "bg-slate/50": true,
                                "w-full": true,
                                "pt-0": true,
                                "border-none": true,
                                "outline-none": true,
                                "text-slate/400": true,
                                "font-medium": true,
                                "text-xl": true,
                                "dark:bg-gray/900": true
                            })}
                        />
                        {showMaxButton && (
                            <button
                                className={`
                                px-4
                                text-xs
                                dark:bg-green/900
                                dark:text-green/500
                                h-max
                                rounded-lg
                                bg-green/100
                                text-green/800
                            `}
                            >
                                MAX
                            </button>
                        )}
                    </div>
                    {conversion && (
                        <p className="text-xs mt-1">
                            <span className="text-gray/400">
                                {conversion.value}
                            </span>{" "}
                            <span className="text-green/500">
                                {conversion.variation}
                            </span>
                        </p>
                    )}
                </div>

                {insideElement && <insideElement.element />}
            </div>
        </div>
    )
}
