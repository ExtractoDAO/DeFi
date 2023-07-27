"use client"
import cn from "classnames"
import { useState } from "react"

interface ButtonProps {
    label?: string
    classNames?: any
    onClick: () => void
}

function Pagination() {
    const [page, setPage] = useState(1)
    const pages = [1, 2, 3]

    const Button = ({ label, classNames, onClick }: ButtonProps) => (
        <button
            onClick={onClick}
            className={
                "py-2 rounded border border-Default/gray/100  text-sm w-8 " +
                classNames
            }
        >
            {label}
        </button>
    )

    const LabeledButton = ({ label, onClick }: ButtonProps) => (
        <button
            onClick={onClick}
            className={
                "py-2 px-1 rounded border border-Default/gray/100 bg-white text-sm text-gray/600 dark:bg-deep-gray/100 dark:border-none dark:text-gray/400"
            }
        >
            {label}
        </button>
    )

    return (
        <div className="flex items-center w-full justify-end gap-1">
            <LabeledButton
                label="Prev"
                onClick={() => {
                    if (page > 1) {
                        setPage(page - 1)
                    }
                }}
            />
            {pages.map((current, i) => {
                return (
                    <Button
                        key={i}
                        label={current.toString()}
                        onClick={() => setPage(current)}
                        classNames={cn({
                            "bg-brand/secondary/500 text-white dark:bg-brand/primary/500 border-none":
                                current === page,
                            "text-gray/600 bg-white dark:bg-deep-gray/100 dark:border-deep-gray/800 dark:text-gray/600":
                                current !== page
                        })}
                    />
                )
            })}
            <LabeledButton
                label="Next"
                onClick={() => {
                    if (page < pages[pages.length]) {
                        setPage(page - 1)
                    }
                }}
            />
        </div>
    )
}

export default Pagination
