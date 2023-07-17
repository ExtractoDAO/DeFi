import { ButtonHTMLAttributes } from "react"
import classNames from "classnames"

interface Props extends ButtonHTMLAttributes<HTMLInputElement> {
    placeholder?: string
    Icon?: {
        Element: React.ForwardRefExoticComponent<
            React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
                title?: string
                titleId?: string
            } & React.RefAttributes<SVGSVGElement>
        >
        position?: "start" | "end"
    }
}

export default function InputField({ placeholder, Icon, ...props }: Props) {
    return (
        <div
            className={classNames({
                "py-2 px-4": true,
                "border border-gray/200": true,
                rounded: true,
                "bg-white": true,
                "gap-2": true,
                "items-center": true,
                "focus-within:outline": true,
                "focus-within:outline-brand/secondary/400": true,
                "focus-within:dark:outline-brand/primary/400": true,
                "focus-within:border-transparent": true,
                flex: true,
                "flex-row-reverse": Icon?.position === "end",
                "dark:bg-deep-gray/100": true,
                "dark:border-deep-gray/400": true
            })}
        >
            {Icon && <Icon.Element className="w-4 h-4 text-gray/500" />}
            <input
                type="text"
                placeholder={placeholder}
                className="outline-none w-full text-gray/400 bg-transparent"
                {...props}
            />
        </div>
    )
}
