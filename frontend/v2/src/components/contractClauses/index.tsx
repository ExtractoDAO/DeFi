"use client"

import Link from "next/link";
import React from "react";
import ContractData from "./contractData";

const ContractClauses = () => {
  return (
    <div className="flex">
      <div className="text-white max-w-[120rem] mr-3">
        <h1 className="text-2xl">Sumário</h1>
        <ol>
          {ContractData.map((section) => (
            <li key={section.id} className="mb-2 border border-gray/500">
              <Link href={`#${section.id}`}>{section.title}</Link>
            </li>
          ))}
        </ol>
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
  );
  
};

export default ContractClauses;
