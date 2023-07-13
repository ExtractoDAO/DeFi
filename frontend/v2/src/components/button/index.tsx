import {
    ButtonHTMLAttributes,
    ReactElement,
    ReactNode,
    cloneElement
} from "react"
import classNames from "classnames"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | string
    iconleft?: ReactElement
    iconright?: ReactElement
    bgColor?: "primary" | "secondary" | "success" | "error" | "warning"
}

const Button = ({
    children,
    iconleft,
    iconright,
    bgColor = "primary",
    ...props
}: ButtonProps) => {
    return (
        <button
            className={classNames({
                [`
                inline-flex 
                py-2 
                px-4 
                items-center 
                gap-[10px] 
                text-sm 
                not-italic 
                font-medium 
                rounded-[4px]
                `]: true,
                [`
                text-white 
                bg-brand/secondary/500 
                hover:bg-brand/secondary/600
                focus:outline-none 
                focus:ring-2 
                focus:ring-brand/secondary/300 
                focus:border-transparent 
                focus:border

                disabled:bg-brand/secondary/100 
                disabled:text-brand/secondary/300

                dark:bg-brand/primary/500 
                dark:text-deep-gray/100
                dark:hover:bg-brand/primary/400
                dark:disabled:text-brand/primary/500
                dark:disabled:bg-brand/primary/200
                dark:focus:ring-brand/primary/200
                `]: bgColor === "primary",
                [` 
                border 
                border-solid 
                border-gray/200 
                bg-white 
                hover:border-gray/300 
                focus:border-gray/800 
                
                disabled:bg-gray/200 
                disabled:text-gray/500
                
                dark:text-gray/250
                dark:bg-deep-gray/100 
                dark:border-gray/350 
                dark:hover:border-gray/400
                dark:disabled:bg-gray/250
                dark:disabled:text-gray/400
                `]: bgColor === "secondary",
                [`
                bg-Default/green/500
                text-white
                cursor-default
                dark:text-deep-gray/100
                `]: bgColor === "success",
                [`
                bg-red/500
                text-white
                hover:bg-red/600

                dark:text-deep-gray/100
                dark:hover:bg-red/400
                `]: bgColor === "error",
                [`
                bg-orange/100
                text-orange/500
                cursor-default
                `]: bgColor === "warning"
            })}
            {...props}
        >
            {iconleft &&
                cloneElement(iconleft, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
            <span>{children}</span>
            {iconright &&
                cloneElement(iconright, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
        </button>
    )
}

export default Button
