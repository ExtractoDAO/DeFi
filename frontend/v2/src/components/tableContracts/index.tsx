"use client"
import { useState } from 'react'
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import SideModal from "../sideModal";

function TableContracts() {
    const [sideModalOpen, setSideModalOpen] = useState(false);

    const count = new Array(6).fill("")

    const Pill = () => {
        return (
            <span className="px-2 text-Default/green/800 bg-Default/green/100 rounded-xl font-medium text-sm">
                Active
            </span>
        )
    }

    const Row = () => {
        return (
            <tr className="bg-white dark:bg-gray/900 border-b border-Default/gray/200 dark:border-deep-gray/200">
                <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                >
                    <p className="text-Default/gray/900 text-sm dark:text-gray/300">
                        My contract 01
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray/500">
                            {"0x0b3237...d0c926"}
                        </span>
                        <button>
                            <DocumentDuplicateIcon className="w-4 h-4 text-gray/400" />
                        </button>
                    </div>
                </th>
                <td className="px-6 py-4 text-gray/500">Extract@</td>
                <td className="px-6 py-4 text-gray/500">
                    <p className="text-sm text-gray/900 font-medium text-center dark:text-gray/300">
                        05-31-2024
                    </p>
                    <p className="text-sm text-gray/500 text-center">
                        approximately 24 blocks
                    </p>
                </td>
                <td className="px-6 py-4 text-gray/500">2.8 Kg</td>
                <td className="px-6 py-4 text-gray/500">0.58 (0.0 USD)</td>
                <td className="px-6 py-4 text-gray/500">
                    <Pill />
                </td>
                <td className="px-6 py-4 text-gray/500">
                    <button 
                    onClick={() => setSideModalOpen(true)}
                    className="text-brand/secondary/500 font-medium text-sm dark:text-brand/primary/500">
                        View
                    </button>
                </td>
            </tr>
        )
    }

    return (
        <div className="relative overflow-x-auto shadow-md shadow-Default/gray/200 sm:rounded-lg mt-4 mb-8 dark:shadow-none dark:border dark:border-deep-gray/200">
            <table className="w-full text-sm text-left">
                <thead className="text-xs font-medium text-gray/500 uppercase bg-Default/gray/50 dark:border-deep-gray/200 border-b border-Default/gray/200 dark:bg-deep-gray/700 dark:text-gray/500">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            contracts
                        </th>
                        <th scope="col" className="px-6 py-3">
                            type
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Expiration date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Weight
                        </th>
                        <th scope="col" className="px-6 py-3">
                            COW
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {count.map((e, i) => {
                        return <Row key={i} />
                    })}
                </tbody>
            </table>
            <SideModal
            contractType='Extract@'
            contract='ExtractoDAO is a privately owned Decentralized Autonomous Organization, sometimes called Decentralized Autonomous Corporation, owner of shared purpose blockchain and manager of a collective smart contract by DAO on Drawer technology that stores several individual smart contracts under the responsibility of each participant that is the contract auditor and issuer of the stablecon COW; And for the purposes of this document represented by the owner Joel Almeida creator, holder, issuer and holder In compliance with all laws of this country. ExtractoDAO It is virtually located in the Domain www.extractodao.com. ExtractoDAO is the rightful issuer of the ExtractoDAO Bull XBLL governance token contract 0x8110706a399D457D67b7A2B7636482b4bfCeBB21, issuer and keeper of the BULL tokens (XBLL)

            On the other hand, the holder of this smart contract is the legal administrator of the private keys and is fully responsible for managing the funds and generating the COW that will be private and sent back to the original wallet.
            Smart contract address: 0x0b32337D35f8CAB81180b031D9A244E088d0c926' 
            contractTitle='contractTitle' 
            title='My Contract 01' 
            contractAddress='0x0b32337D35f8CAB81180b031D9A244E088d0c926'  
            onClose={() => setSideModalOpen(false)} open={sideModalOpen} />
        </div>
    )
}

export default TableContracts
