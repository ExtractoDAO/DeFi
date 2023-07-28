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

export default function SideModal({ title, contractType, contractAddress, contractTitle, contract, open, onClose }: SideModalProps) {
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
                    <div
                        className="fixed 
                    inset-0 
                    bg-gray/500 
                    bg-opacity-75 
                    transition-opacity
                    "
                    />
                </Transition.Child>

                <div
                    className="fixed 
                inset-0 
                overflow-hidden
                "
                >
                    <div
                        className="absolute 
                    inset-0 
                    overflow-hidden
                    "
                    >
                        <div
                            className="pointer-events-none 
                        fixed 
                        inset-y-0 
                        right-0 
                        flex 
                        max-w-full
                        pl-10
                        "
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel
                                    className="pointer-events-auto 
                                relative 
                                w-screen 
                                max-w-md
                                "
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
                                        sm:pr-4"
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
                                    bg-white 
                                    gap-6 
                                    p-6

                                    dark:bg-gray/900
                                    "
                                    >
                                        <div
                                            className="flex 
                                        flex-col 
                                        items-start 
                                        gap-2 
                                        px-4 
                                        sm:px-6
                                        "
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
                                                
                                                dark:text-gray/300
                                                "
                                                >
                                                    {title}
                                                    Panel title
                                                </h1>
                                                <div
                                                    className="rounded-[130px] 
                                                bg-brand/secondary/100 
                                                gap-[10px] 
                                                flex 
                                                items-center 
                                                py-0 
                                                px-2
                                                
                                                dark:bg-dark/purple/600
                                                "
                                                >
                                                    <p
                                                        className="text-brand/secondary/500 
                                                    text-sm 
                                                    font-semibold 
                                                    not-italic
                                                    
                                                    dark:text-brand/primary/500
                                                    "
                                                    >
                                                        {contractType}
                                                        FAT OX
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
                                                0x0b32337D35f8CAB81180b031D9A244E088d0c926
                                            </Link>
                                        </div>
                                        <div
                                            className="overflow-y-auto 
                                        flex 
                                        p-6 
                                        flex-col 
                                        items-start 
                                        gap-10 
                                        self-stretch
                                        border
                                        border-gray/200
                                        rounded
                                        shadow-sm

                                        dark:bg-deep-gray/100
                                        dark:border-deep-gray/200
                                        "
                                        >
                                            <div
                                                className="felx 
                                            w-full 
                                            flex-col 
                                            gap-4 
                                            items-start
                                            "
                                            >
                                                <h1
                                                    className="text-gray/900 
                                                text-[20px] 
                                                not-italic 
                                                font-semibold
                                                
                                                dark:text-gray/300
                                                "
                                                >
                                                    {contractTitle}
                                                    Members agreement in the
                                                    form of production
                                                    cooperation by ExtractoDAO
                                                    Smart Contracts
                                                </h1>
                                                <p
                                                    className="text-gray/500 
                                                text-sm 
                                                font-normal 
                                                not-italic
                                                
                                                dark:text-gray/600
                                                "
                                                >
                                                    {contract}
                                                    ExtractoDAO is a privately
                                                    owned Decentralized
                                                    Autonomous Organization,
                                                    sometimes called
                                                    Decentralized Autonomous
                                                    Corporation, owner of shared
                                                    purpose blockchain and
                                                    manager of a collective
                                                    smart contract by DAO on
                                                    Drawer technology that
                                                    stores several individual
                                                    smart contracts under the
                                                    responsibility of each
                                                    participant that is the
                                                    contract auditor and issuer
                                                    of the stablecon COW; And
                                                    for the purposes of this
                                                    document represented by the
                                                    owner Joel Almeida creator,
                                                    holder, issuer and holder In
                                                    compliance with all laws of
                                                    this country. ExtractoDAO It
                                                    is virtually located in the
                                                    Domain www.extractodao.com.
                                                    ExtractoDAO is the rightful
                                                    issuer of the ExtractoDAO
                                                    Bull XBLL governance token
                                                    contract
                                                    0x8110706a399D457D67b7A2B763648
                                                    2b4bfCeBB21, issuer and
                                                    keeper of the BULL tokens
                                                    (XBLL) In conformity with
                                                    all the laws of this. On the
                                                    other hand, the holder of
                                                    this smart contract is the
                                                    legal administrator of the
                                                    private keys and is fully
                                                    responsible for managing the
                                                    funds and generating the COW
                                                    that will be private and
                                                    sent back to the original
                                                    wallet. Smart contract
                                                    address:
                                                    0x0b32337D35f8CAB81180b031D9A244E0
                                                    88d0c926
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className="flex 
                                        flex-col 
                                        items-start 
                                        gap-2 
                                        self-stretch
                                        "
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
