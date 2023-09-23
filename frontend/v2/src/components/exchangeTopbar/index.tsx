import { ButtonHTMLAttributes } from "react"

import { ArrowTrendingUpIcon } from "@heroicons/react/20/solid"

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
}

export default function ExchangeTopBar() {
    const options = [
        {
            label: "trending",
            key: "trending"
        },
        {
            label: "1. Extract@",
            key: "extracto"
        }
    ]

    const Button = ({ label, ...props }: IButton) => {
        return (
            <button
                {...props}
                className="uppercase text-xs flex items-center gap-3 font-medium text-gray/500 dark:text-gray/400"
            >
                {label === "trending" && (
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                )}
                {label}
            </button>
        )
    }

    return (
        <div className="container-fluid border-b border-gray/200 dark:border-gray/600">
            <div className="row">
                <div className="col">
                    <div className="px-6 py-2 flex items-center gap-6">
                        {options.map((item) => (
                            <Button label={item.label} key={item.key} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
