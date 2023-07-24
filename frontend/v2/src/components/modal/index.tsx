"use client"
import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Button from "../button"
import classNames from "classnames"

interface ModalProps {
    title: string
    icon?: React.ReactNode
    message: string
}

export default function Modal({ title, icon, message }: ModalProps) {
    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                ></Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div> {icon}</div>
                    <div>
                        <p>{message}</p>
                    </div>
                    <Dialog.Title as="h3">{title}</Dialog.Title>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}
