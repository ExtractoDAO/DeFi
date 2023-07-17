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
                w-full
                justify-center
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
                text-base/white 
                bg-brand/secondary/500 
                hover:bg-brand/secondary/600
                focus:outline-brand/secondary/300 
                focus:outline
                focus:outline-2
                focus:outline-offset-1
                cursor-pointer

                disabled:bg-brand/secondary/100 
                disabled:text-brand/secondary/300
                disabled:cursor-default

                dark:bg-brand/primary/500 
                dark:text-deep-gray/100
                dark:hover:bg-brand/primary/400
                dark:focus:outline-brand/primary/200

                dark:disabled:text-brand/primary/500
                dark:disabled:bg-brand/primary/200
                `]: bgColor === "primary",
                [` 
                border 
                border-solid 
                border-gray/200 
                bg-base/white 
                hover:border-gray/300 
                focus:border-gray/800
                cursor-pointer
                
                disabled:bg-gray/200 
                disabled:text-gray/500
                disabled:cursor-default
                disabled:border-none
                
                dark:text-gray/250
                dark:bg-deep-gray/100 
                dark:border-gray/700 
                dark:hover:border-gray/400
                dark:focus:border-gray/500

                dark:disabled:bg-gray/250
                dark:disabled:text-gray/400
                `]: bgColor === "secondary",
                [`
                bg-green/600
                text-base/white
                border
                border-green/200
                hover:bg-green/500
                focus:border-green/800
                cursor-pointer
                
                disabled:bg-green/100
                disabled:border-none
                disabled:cursor-default
                disabled:text-green/300

                dark:text-deep-gray/100
                dark:bg-green/500
                dark:border-green/500
                dark:hover:bg-green/600
                dark:hover:border-green/600
                dark:focus:border
                dark:focus:border-green/700

                dark:disabled:bg-green/200
                dark:disabled:text-green/600
                `]: bgColor === "success",
                [`
                bg-error/600
                text-base/white
                border
                border-error/400
                hover:bg-error/500
                focus:border-error/700
                cursor-pointer

                disabled:bg-error/100
                disabled:border-none
                disabled:cursor-default
                disabled:text-error/300

                dark:text-deep-gray/100
                dark:bg-error/500
                dark:border-error/500
                dark:hover:bg-error/600
                dark:hover:border-error/600
                dark:focus:border-error/700

                dark:disabled:bg-error/300
                dark:disabled:text-error/600
                `]: bgColor === "error",
                [`
                bg-warning/100
                text-warning/500
                border
                border-warning/300
                hover:bg-warning/200
                focus:border-warning/500
                cursor-pointer

                disabled:bg-disabled/warning/100
                disabled:border-none
                disabled:cursor-default
                disabled:text-warning/300

                dark:text-deep-gray/100
                dark:hover:bg-warning/300
                dark:hover:border-warning/300
                dark:bg-dark/warning/200
                dark:border-dark/warning/200
                dark:focus:border-error/400

                dark:disabled:bg-warning/200
                dark:disabled:text-warning/500
                `]: bgColor === "warning"
            })}
            {...props}
        >
            {iconleft &&
                cloneElement(iconleft, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
            {children}
            {iconright &&
                cloneElement(iconright, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
        </button>
    )
}

export default Button
