"use client"

import Link from "next/link"
import React from "react"
import ContractData from "./contractData"

const ContractClauses = () => {
    return (
        <div className="flex
            ">
            <div
                className="text-gray/900
                  bg-white
                    max-w-[312px]
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
                        "
                >
                    <h1
                        className="text-lg
                            font-semibold
                            not-italic
                            leading-normal"
                    >
                        Sumary
                    </h1>
                   
                        <ol className="list-decimal
                        
                        ">
                            {ContractData.map((section) => (
                                <li
                                    key={section.id}
                                    className="flex
                                        max-w-[264px]
                                        pb-1
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
                                            dark:focus:bg-clauses/section/active"
                                        href={`#${section.id}`}
                                    >
                                        {section.title}
                                    </Link>
                                </li>
                            ))}
                        </ol>
               
                </div>
            </div>
            <div id="contract" className="flex
                                    w-[71%]
                                    flex-col
                                    items-start
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
                                    
                                    ">
                <div className="flex
                        flex-col
                        items-start">
                    <h1 className="text-2xl
                            not-italic
                            leading-normal
                            font-semibold
                            text-gray/900
                ">Fat OX Contract</h1>
                    <Link
                        href={`https://polygonscan.com/address/`}
                        target="_blank"
                        className="text-xs 
                                                font-normal 
                                                text-gray/500
                                                dark:text-gray/500
                                                "
                    >
                        0x0b32337D35f8CAB81180b031D9A244E088d0c926
                    </Link>
                </div>
                <div className="scroll-smooth
                        scroll
                        scrolllight
                        overflow-y-auto 
                        border-0
                        border-gray/500 
                        text-white 
                        h-full
                        w-full
                        flex
                        flex-col
                        items-start
                        flex-[1_0_0]
                        gap-10
                        pr-3

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
                                                ">{section.title}</h2>
                            <p className="items-stretch
                                    text-sm
                                    font-normal
                                    not-italic
                                    text-gray/600
                               ">{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ContractClauses
