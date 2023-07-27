"use client"
import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Button from "../button"
import Link from "next/link"

type SideModalProps = {
    onClose: () => void
    open: boolean
}

export default function SideModal({ open, onClose }: SideModalProps) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray/500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray/300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={onClose}
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
                                    <div className="flex h-full flex-col items-start shrink-0 bg-white p-6">
                                        <div className="flex flex-col items-start gap-2 px-4 sm:px-6">
                                            <Dialog.Title className="flex items-center gap-2">
                                                <h1 className="text-gray/900 text-[20px] not-italic font-semibold">
                                                    Panel title
                                                </h1>
                                                <div className="rounded-[130px] bg-brand/secondary/100 gap-[10px] flex items-center py-0 px-2">
                                                    <p className="text-brand/secondary/500 text-sm font-semibold not-italic">
                                                        FAT OX
                                                    </p>
                                                </div>
                                            </Dialog.Title>
                                            <Link
                                                className="text-xs font-normal text-gray/500"
                                                href={`https://polygonscan.com/address/`}
                                                target="_blank"
                                            >
                                                0x0b32337D35f8CAB81180b031D9A244E088d0c926
                                            </Link>
                                        </div>
                                        <div className="overflow-y-auto flex p-6 flex-col items-start gap-10 self-stretch">
                                            <div className="felx w-full flex-col gap-4 items-start">
                                                <h1 className="text-gray/900 text-[20px] not-italic font-semibold">
                                                    Titulo do contrato
                                                </h1>
                                                <p className="text-gray/500 text-sm font-normal not-italic">
                                                    Contrato
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start gap-2 self-stretch">
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
