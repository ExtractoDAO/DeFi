import {
    ButtonHTMLAttributes,
    ReactElement,
    ReactNode,
} from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    iconleft?: ReactElement
    iconright?: ReactElement
    variant?: ""
    defaultStyle?: string
}

export const Button = (props: ButtonProps) => {
    const { variant } = props


    switch (variant) {
        case "":
            return <></>
        default:
            return <></>
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