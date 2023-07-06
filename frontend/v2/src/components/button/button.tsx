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
        <button>
            {iconright &&
                cloneElement(iconright, {
                    className: ""
                })}
            <span>{children}</span>
            {iconleft &&
                cloneElement(iconleft, {
                    className: ""
                })}
        </button>
    )
}

export const PrimBtDisabled = (props: ButtonProps) => {
    const { children, iconleft, iconright, defaultStyle } = props

    return (
        <button>
            {iconright &&
                cloneElement(iconright, {
                    className: ""
                })}
            <span>{children}</span>
            {iconleft &&
                cloneElement(iconleft, {
                    className: ""
                })}
        </button>
    )
}

export const SecondaryButton = (props: ButtonProps) => {
    const { children, iconleft, iconright, defaultStyle } = props

    return (
        <button>
            {iconright &&
                cloneElement(iconright, {
                    className: ""
                })}
            <span>{children}</span>
            {iconleft &&
                cloneElement(iconleft, {
                    className: ""
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
                    className: ""
                })}
            <span>{children}</span>
            {iconleft &&
                cloneElement(iconleft, {
                    className: ""
                })}
        </button>
    )
}