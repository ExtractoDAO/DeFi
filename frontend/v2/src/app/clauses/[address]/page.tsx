"use client"

import Link from "next/link"
import React from "react"
import ContractData from "./contractData"
import Dropdown from "@/components/dropDown"

interface ClausesProps {
    params: {
        address: string;
    }
}

export default function ContractClauses({ params }: ClausesProps) {
    const DropdownOptions = [
        { name: 'Alias for contract', link: '#' },
        { name: 'Withdraw', link: '#' },
        { name: 'Download in PDF', link: '#' },
    ];

    return (
        <div className="flex flex-row
            ">
            <div
                className="text-gray/900
                   bg-white
                    w-[24%]
                    max-h-[478px]
                    flex
                    items-start
                    p-6
                    flex-col
                    gap-10
                    shrink-0
                    rounded
                    border
                    border-solid
                    border-gray/200
                    max-lg:hidden
                    

                    dark:border-deep-gray/200
                    dark:bg-deep-gray/100
                    dark:text-white"
            >
                <div
                    className="flex
                        flex-col
                        items-start
                        gap-4
                        self-stretch
                        scroll-smooth
                        scroll
                        scrolllight
                        overflow-y-auto

                        dark:scrolldark
                        ">
                    <h1
                        className="text-lg
                            font-semibold
                            not-italic
                            leading-normal

                            dark:text-gray/300"
                    >
                        Sumary
                    </h1>

                    <ol className="list-decimal
                        
                        ">
                        {ContractData.map((section, index) => (
                            <li
                                key={section.id}
                                className="flex
                                        max-w-[264px]
                                        pb-1
                                        pr-1
                                            ">
                                               
                                <Link
                                    className="
                                            hover:bg-slate/200
                                            focus:bg-slate/100
                                            focus:text-gray/900
                                            py-2
                                            px-2
                                            items-start
                                            w-full
                                            rounded
                                            text-gray/500
                                    
                                            dark:hover:bg-clauses/section/hover
                                            dark:focus:bg-clauses/section/active
                                            dark:focus:text-gray/300"
                                    href={`#${section.id}`} onClick={() => {
                                        console.log(`Clicked on section with ID: ${section.id}`);
                                      }}
                                >
                                    {`${index + 1}. ${section.title}`}
                                </Link>
                            </li>
                        ))}
                    </ol>

                </div>
            </div>
            <div id="contract"
                className="
                     flex
                     flex-col
                     max-lg:w-[98%]
                     h-[675px]
                     max-2xl:h-[589px]
                     max-md:max-h-[550px]
                     w-[74%]
                     gap-10
                     shrink-0
                     rounded
                     border
                     border-solid
                     border-gray/200
                     box-shadow
                     bg-white
                     p-6
                     ml-6
                     max-lg:ml-2
                                    
                     dark:border-deep-gray/200
                     dark:bg-deep-gray/100
                     ">
                <div className="flex
                         flex-row
                         items-start
                         justify-between">
                    <div className="flex
                             flex-col">
                        <h1 className="text-2xl
                            not-italic
                            leading-normal
                            font-semibold
                            text-gray/900

                            dark:text-white
                ">Fat OX Contract</h1>
                        <Link
                            href={`https://polygonscan.com/address/`}
                            target="_blank"
                            className="text-xs 
                           font-normal 
                           text-gray/500
                           max-sm:max-w-[120px]
                           ">
                            0x0b32337D35f8CAB81180b031D9A244E088d0c926
                        </Link>
                    </div>
                    <Dropdown titleMenu="More options" options={DropdownOptions} />
                </div>
                <div className="scroll-smooth
                        scroll
                        scrolllight
                        overflow-y-auto 
                        border-0
                        border-gray/500 
                        gap-10
                        pr-3
                        w-full
                        h-[90%]
                        flex
                        flex-col
                        items-start

                        dark:scrolldark
                     ">
                    {ContractData.map((section) => (
                        <div key={section.id} className="flex
                                                  flex-col
                                                  gap-4
                                                  items-start">
                            <h2 id={section.id} className="text-gray/900
                                                    text-xl
                                                    not-italic
                                                    font-semibold
                                                    leading-normal

                                                    dark:text-white
                                                ">{section.title}</h2>
                            <p className="items-stretch
                                    text-sm
                                    font-normal
                                    not-italic
                                    text-gray/600

                                    dark:text-gray/200
                               ">{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
