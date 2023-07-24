import cn from "classnames"

interface ButtonProps {
    label?: string
    classNames?: any
}

function Pagination() {
    const Button = ({ label, classNames }: ButtonProps) => (
        <button
            className={
                "py-2 rounded border border-Default/gray/100  text-sm w-8 " +
                classNames
            }
        >
            {label}
        </button>
    )

    const LabeledButton = ({ label, classNames }: ButtonProps) => (
        <button
            className={
                "py-2 px-1 rounded border border-Default/gray/100 bg-white text-sm text-gray/600"
            }
        >
            {label}
        </button>
    )

    return (
        <div className="flex items-center w-full justify-end gap-1">
            <LabeledButton label="Prev" />
            <Button
                label="1"
                classNames={"bg-brand/secondary/500 text-white "}
            />
            <Button label="2" classNames={"text-gray/600 bg-white"} />
            <Button label="3" classNames={"text-gray/600 bg-white"} />
            <LabeledButton label="Next" />
        </div>
    )
}

export default Pagination
