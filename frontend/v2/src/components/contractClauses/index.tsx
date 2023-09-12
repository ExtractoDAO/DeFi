"use client"

import Link from "next/link"
import React from "react"
import ContractData from "./contractData"

const ContractClauses = () => {
    return (
        <div className="flex">
            <div
                className="text-white 
                    max-w-[312px] 
                    items-start
                    p-6
                    flex
                    flex-col
                    gap-10
                    shrink-0
                    rounded
                    border
                    border-solid
                    border-deep-gray/200
                    bg-deep-gray/100"
            >
                <div
                    className="flex
                        flex-col
                        items-start
                        gap-4
                        self-stretch"
                >
                    <h1
                        className="text-lg
                            font-semibold
                            not-italic
                            leading-normal"
                    >
                        Sumary
                    </h1>
                    <div
                        className="
                        overflow-y-auto"
                    >
                        <ol className="overflow-y-auto">
                            {ContractData.map((section) => (
                                <li
                                    key={section.id}
                                    className="flex
                                    overflow-y-auto
                                    max-w-[264px]
                                    gap-1
                                    "
                                >
                                    <Link
                                        className="hover:bg-clauses/section/hover
                                    focus:bg-clauses/section/active
                                    py-2
                                    px-2
                                    items-start
                                    w-full
                                    rounded"
                                        href={`#${section.id}`}
                                    >
                                        {section.title}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
            <div id="contract">
                <h1>CONTRATO</h1>
                <div className="scroll-smooth overflow-y-auto border border-gray/500 text-white h-[600px] w-[600px]">
                    {ContractData.map((section) => (
                        <div key={section.id}>
                            <h2 id={section.id}>{section.title}</h2>
                            <p className="text-red/500">{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ContractClauses
