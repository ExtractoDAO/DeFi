"use client"
import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Button from "../button"
import Link from "next/link"

type SideModalProps = {
    onClose: () => void
    open: boolean
    title: string
    contractType: string
    contractAddress: string
    contractTitle: string
    contract: string
}

export default function SideModal({
    title,
    contractType,
    contractAddress,
    contractTitle,
    contract,
    open,
    onClose
}: SideModalProps) {
    const [ope, setOpen] = useState(true)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave=" duration-500"
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
                            overflow-hidden"
                >
                    <div
                        className="absolute 
                                inset-0 
                                overflow-hidden"
                    >
                        <div
                            className="pointer-events-none 
                                    fixed 
                                    inset-y-0 
                                    right-0 
                                    flex 
                                    max-w-full
                                    max-sm:bottom-0 
                                    max-sm:absolute 
                                    max-sm:w-full"
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="sm:translate-x-full max-sm:translate-y-80"
                                enterTo="sm:translate-x-0 max-sm:translate-y-0"
                                leave="transform transition ease-in-out duration-500 "
                                leaveFrom="sm:translate-x-0 max-sm:translate-y-0"
                                leaveTo="sm:translate-x-full max-sm:translate-y-full"
                            >
                                <Dialog.Panel
                                    className="pointer-events-auto 
                                            relative 
                                            w-screen 
                                            max-w-md
                                            max-md:h-[92.6%]
                                            max-sm:h-[85%]
                                            max-sm:m-auto"
                                >
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div
                                            className="absolute 
                                                    left-0 
                                                    top-0 
                                                    -ml-8 
                                                    flex 
                                                    pr-2 
                                                    pt-4 
                                                    sm:-ml-10 
                                                    sm:pr-4
                                                    max-sm:hidden"
                                        >
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="rounded-md 
                                                        text-gray/300 
                                                        hover:text-white 
                                                        focus:outline-none 
                                                        focus:ring-2 
                                                        focus:ring-white"
                                            >
                                                <span className="sr-only">
                                                    Close panel
                                                </span>
                                                <XMarkIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div
                                        className="flex 
                                                h-full 
                                                flex-col 
                                                items-start 
                                                shrink-0 
                                                bg-slate/50
                                                gap-6 
                                                p-6
                                                max-sm:rounded
                                 
                                                dark:gray/sidemodal/900"
                                    >
                                        <div
                                            className="flex 
                                                    flex-col 
                                                    items-start 
                                                    gap-2 
                                                    px-4 
                                                    sm:px-0"
                                        >
                                            <Dialog.Title
                                                className="flex 
                                                        items-center 
                                                        gap-2"
                                            >
                                                <h1
                                                    className="text-gray/900 
                                                            text-[20px] 
                                                            not-italic 
                                                            font-semibold
                                                
                                                            dark:text-gray/300"
                                                >
                                                    {title}
                                                </h1>
                                                <div
                                                    className="rounded-[130px] 
                                                            bg-brand/secondary/100 
                                                            gap-[10px] 
                                                            flex 
                                                            items-center 
                                                            py-0 
                                                            px-2
                                                
                                                            dark:bg-dark/purple/600"
                                                >
                                                    <p
                                                        className="text-brand/secondary/500 
                                                                text-sm 
                                                                font-semibold 
                                                                not-italic
                                                    
                                                                dark:text-brand/primary/500"
                                                    >
                                                        {contractType}
                                                    </p>
                                                </div>
                                            </Dialog.Title>
                                            <Link
                                                href={`https://polygonscan.com/address/`}
                                                target="_blank"
                                                className="text-xs 
                                                font-normal 
                                                text-gray/500
                                                dark:text-gray/500
                                                "
                                            >
                                                {contractAddress}
                                            </Link>
                                        </div>
                                        <div
                                            className="overflow-y-auto
                                                    bg-white
                                                    flex 
                                                    p-6
                                                    flex-col 
                                                    items-start 
                                                    self-stretch
                                                    border
                                                    border-gray/200
                                                    rounded
                                                    shadow-sm
                                                    max-sm:p-0
                                                    max-sm:border-none

                                                    dark:bg-deep-gray/100
                                                    dark:border-deep-gray/200"
                                        >
                                            <div
                                                className="felx 
                                                        w-full 
                                                        flex-col 
                                                        gap-4 
                                                        items-start"
                                            >
                                                <h1
                                                    className="text-gray/900 
                                                            text-[20px] 
                                                            not-italic 
                                                            font-semibold
                                                
                                                            dark:text-gray/300"
                                                >
                                                    {contractTitle}
                                                </h1>
                                                <p
                                                    className="text-gray/500 
                                                            text-sm 
                                                            font-normal 
                                                            not-italic
                                                
                                                            dark:text-gray/600"
                                                >
                                                    {contract}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className="flex 
                                                    flex-col 
                                                    items-start 
                                                    gap-2 
                                                    self-stretch"
                                        >
                                            <Button>Withdraw</Button>
                                            <Button bgColor="secondary">
                                                Read more
                                            </Button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
