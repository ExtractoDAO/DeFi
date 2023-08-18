import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

import classNames from "classnames"

import spinner from "@/assets/img/icons/spinner.png"
import Image from "next/image"

interface ModalProps {
    open: boolean
    message: {
        "line-1": string
        "line-2": string
        "line-3": string
    }
}

export default function ModalLoading({ open, message }: ModalProps) {
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
                                    sm:pb-4
                                    dark:bg-deep-gray/100"
                                >
                                    <div
                                        className="sm:flex
                                        sm:items-start"
                                    >
                                        <div
                                            className={classNames(
                                                "mx-auto p-1 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                                            )}
                                        >
                                            <Image
                                                src={spinner}
                                                alt="spinner"
                                                className="animate-spin"
                                            />
                                        </div>

                                        <div
                                            className="mt-3
                                            gap-2
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
                                             text-gray/900
                                             dark:text-gray/300
                                             "
                                            >
                                                {message["line-1"]}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p
                                                    className="text-sm
                                                text-gray/500"
                                                >
                                                    {message["line-2"]}
                                                </p>

                                                <p
                                                    className="text-sm
                                                text-gray/500"
                                                >
                                                    {message["line-3"]}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
