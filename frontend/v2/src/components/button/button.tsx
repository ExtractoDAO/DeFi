import {
    ButtonHTMLAttributes,
    ReactElement,
    ReactNode,
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


    switch (variant) {
        case "secondary":
            return <SecondaryButton {...props} />
        case "secdisabled":
            return <SecBtDisabled {...props} />
        case "primdisabled":
            return <PrimBtDisabled {...props} />
        default:
            return <PrimaryButton {...props} />
    }
}

export const PrimaryButton = (props: ButtonProps) => {

    return (
        <button>
            
        </button>
    )
}

export const PrimBtDisabled = (props: ButtonProps) => {

    return (
        <button>
            
        </button>
    )
}

export const SecondaryButton = (props: ButtonProps) => {

    return (
        <button>

        </button>
    )
}

export const SecBtDisabled = (props: ButtonProps) => {

    return (
        <button>

        </button>
    )
}