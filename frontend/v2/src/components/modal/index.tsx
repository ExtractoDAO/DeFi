"use client"
import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Button from "../button"
import classNames from "classnames"

interface ButtonProps {
    label: string
    onClick: () => void
    bgColor?: "primary" | "secondary" | "success" | "error" | "warning"
}
interface ModalProps {
    title: string
    icon?: React.ReactNode
    message: string
    buttons: ButtonProps[]
    open: boolean
    iconBgColor?: string
}

export default function Modal({
    title,
    icon,
    message,
    buttons,
    iconBgColor,
    open
}: ModalProps) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed 
                    inset-0 
                    bg-gray/500 
                    bg-opacity-75 
                    transition-opacity"
                    />
                </Transition.Child>
                <div
                    className="fixed 
                inset-0 
                z-10 
                overflow-y-auto"
                >
                    <div
                        className="flex 
                    min-h-full 
                    items-end 
                    justify-center 
                    p-4 
                    text-center 
                    sm:items-center 
                    sm:p-0"
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative 
                            transform 
                            overflow-hidden 
                            rounded-lg 
                            bg-white 
                            text-left 
                            shadow-xl 
                            transition-all 
                            sm:my-8 
                            sm:w-full 
                            sm:max-w-lg"
                            >
                                <div
                                    className="bg-white 
                                px-4 
                                pb-4 
                                pt-5 
                                sm:p-6 
                                sm:pb-4"
                                >
                                    <div
                                        className="sm:flex 
                                sm:items-start"
                                    >
                                        <div>
                                            {icon && (
                                                <div
                                                    className={classNames(
                                                        "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10",
                                                        {
                                                            [`${iconBgColor}`]:
                                                                iconBgColor
                                                        }
                                                    )}
                                                >
                                                    {icon}
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className="mt-3 
                                        text-center 
                                        sm:ml-4 
                                        sm:mt-0 
                                        sm:text-left"
                                        >
                                            <Dialog.Title
                                                as="h3"
                                                className="text-base 
                                             font-semibold 
                                             leading-6 
                                             text-gray/900"
                                            >
                                                {title}
                                            </Dialog.Title>
                                            <div>
                                                <p>{message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {buttons.map((button, index) => (
                                    <div
                                        key={index}
                                        className={classNames({
                                            "flex justify-center max-sm:mb-1 max-sm:ml-0":
                                                index === 0
                                        })}
                                    >
                                        <Button
                                            bgColor={button.bgColor}
                                            onClick={button.onClick}
                                        >
                                            {button.label}
                                        </Button>
                                    </div>
                                ))}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
