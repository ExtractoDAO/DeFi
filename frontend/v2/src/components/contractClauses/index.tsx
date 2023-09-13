"use client"

import Link from "next/link"
import React from "react"
import ContractData from "./contractData"

const ContractClauses = () => {
    return (
        <div className="flex">
            <div
                className="
                text-gray/900
                    max-w-[312px] 
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
          
                        "
                    >
                        <ol className="list-decimal">
                            {ContractData.map((section) => (
                                <li
                                    key={section.id}
                                    className="flex
                            
                                    max-w-[264px]
                                    pb-1
                                    "
                                >
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
