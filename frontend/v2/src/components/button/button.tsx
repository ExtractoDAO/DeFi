import {
    ButtonHTMLAttributes,
    ReactElement,
    ReactNode,
    cloneElement,
} from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    iconleft?: ReactElement
    iconright?: ReactElement
    variant?:
        | "primary"
        | "secondary"
        | "primdisabled"
        | "secdisabled"
    defaultStyle?: string
}

export const Button = (props: ButtonProps) => {
    const { variant } = props

    const style =
        "flex inline-flex py-2 px-4 items-center gap-[10px] text-sm not-italic font-medium rounded-[4px] dark:bg-brand/primary/500 dark:text-deep-gray/100 "

        switch (variant) {
            case "secondary":
                return <SecondaryButton defaultStyle={style} {...props} />
            case "secdisabled":
                return <SecBtDisabled defaultStyle={style} {...props} />
            case "primdisabled":
                return <PrimBtDisabled defaultStyle={style} {...props} />
            default:
                return <PrimaryButton defaultStyle={style} {...props} />
        }
    }

export const PrimaryButton = (props: ButtonProps) => {
    const { children, iconleft, iconright, defaultStyle } = props

    return (
        <button
        {...props}
            className={`${defaultStyle} 
                text-white 
                bg-brand/secondary/500 
                hover:bg-brand/secondary/600
                  focus:outline-none 
                  focus:ring-2 
                focus:ring-brand/secondary/300 
                  focus:border-transparent 
                  focus:border
                  dark:text-deep-gray/100
                `}
        >
            {iconright &&
                cloneElement(iconright, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
            <span>{children}</span>
            {iconleft &&
                cloneElement(iconleft, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
        </button>
    )
}

export const PrimBtDisabled = (props: ButtonProps) => {
    const { children, iconleft, iconright, defaultStyle } = props

    return (
        <button
            {...props}
            className={`${defaultStyle} 
                bg-brand/secondary/100
                text-brand/secondary/300
                  cursor-default
                `}
        >
            {iconright &&
                cloneElement(iconright, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
            <span>{children}</span>
            {iconleft &&
                cloneElement(iconleft, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
        </button>
    )
}

export const SecondaryButton = (props: ButtonProps) => {
    const { children, iconleft, iconright, defaultStyle } = props

    return (
        <button
            {...props}
            className={`${defaultStyle} 
                    border 
                    border-solid 
                  border-gray/200 
                  bg-white
                  hover:border-gray/300
                  focus:border-gray/800
                  dark:text-deep-gray/100
                    
                  `}
        >
            {iconright &&
                cloneElement(iconright, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
            <span>{children}</span>
            {iconleft &&
                cloneElement(iconleft, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
        </button>
    )
}

export const SecBtDisabled = (props: ButtonProps) => {
    const { children, iconleft, iconright, defaultStyle } = props

    return (
        <button>
            {iconright &&
                cloneElement(iconright, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
            <span>{children}</span>
            {iconleft &&
                cloneElement(iconleft, {
                    className: "w-[16px] h-[16px] shrink-0"
                })}
        </button>
    )
}