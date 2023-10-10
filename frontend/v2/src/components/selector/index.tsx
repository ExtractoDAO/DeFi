"use client"

import { ChevronDownIcon } from "@heroicons/react/20/solid"

import { Menu } from "@headlessui/react"
import classNames from "classnames"

interface IOptions {
    name: string
    value: string
}

interface ISelect {
    options: IOptions[]
    onChange: (value: IOptions["value"]) => void
    value?: IOptions["value"]
    placeholder: string
    label?: string
}

function Select({ options, onChange, value, placeholder, label }: ISelect) {
    return (
        <Menu>
            <div className="flex flex-col gap-[0.375rem]">
                {!!label && (
                    <label className="text-deep-gray/600 dark:text-gray/250 text-sm">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <Menu.Button
                        className="
                        w-full py-2 pl-3 pr-8
                        border border-default/gray/300
                        dark:border-slate/800
                        rounded
                        text-sm
                        text-slate/400
                        text-left
                        relative
                        truncate
                    "
                    >
                        {!!value
                            ? options.filter((e) => e.value === value)[0].name
                            : placeholder}
                        <ChevronDownIcon
                            color="#93A2B7"
                            width={16}
                            className="absolute right-2 top-3"
                        />
                    </Menu.Button>
                    <Menu.Items
                        className="
                        flex flex-col
                        absolute top-9
                        bg-white
                        dark:bg-deep-gray/100
                        py-2 px-3
                        border
                        border-default/gray/300

                        text-sm
                        dark:border-slate/600
                        pb-0,
                        w-full
                    "
                    >
                        {options.map((e, i) => {
                            return (
                                <Menu.Item key={i}>
                                    <button
                                        onClick={() => onChange(e.value)}
                                        className={classNames({
                                            "text-slate/400 mb-1 text-left pt-2 truncate":
                                                true,
                                            "border-b border-slate/100 dark:border-slate/600 pb-2":
                                                i < options.length - 1
                                        })}
                                    >
                                        {e.name}
                                    </button>
                                </Menu.Item>
                            )
                        })}
                    </Menu.Items>
                </div>
            </div>
        </Menu>
    )
}

export default Select
