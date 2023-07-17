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
                bg-base/white 
                border-gray/200 
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
                bg-green/500
                hover:bg-green/600
                text-base/white
                focus:outline-green/700
                focus:outline
                focus:outline-1
                cursor-pointer
                
                disabled:bg-green/100
                disabled:text-green/300
                disabled:cursor-default

                dark:text-deep-gray/100
                dark:bg-green/600
                dark:hover:bg-green/500
                dark:focus:outline-green/800
                dark:focus:outline
                dark:focus:outline-1

                dark:disabled:bg-green/200
                dark:disabled:text-green/600
                `]: bgColor === "success",
                [`
                bg-error/500
                hover:bg-error/600
                text-base/white
                focus:outline-error/700
                focus:outline
                focus:outline-1
                cursor-pointer

                disabled:bg-error/100
                disabled:text-error/300
                disabled:cursor-default

                dark:text-deep-gray/100
                dark:bg-error/600
                dark:hover:bg-error/500
                dark:focus:outline-error/800
                dark:focus:outline
                dark:focus:outline-1

                dark:disabled:bg-error/300
                dark:disabled:text-error/600
                `]: bgColor === "error",
                [`
                bg-warning/100
                hover:bg-warning/200
                text-warning/500
                focus:outline-warning/300
                focus:outline
                focus:outline-1
                cursor-pointer

                disabled:bg-warning/50
                disabled:text-warning/300
                disabled:cursor-default

                dark:text-deep-gray/100
                dark:bg-warning/200
                dark:hover:bg-warning/100
                dark:focus:outline-warning/400
                dark:focus:outline
                dark:focus:outline-1

                dark:disabled:bg-warning/50
                dark:disabled:text-warning/400
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
