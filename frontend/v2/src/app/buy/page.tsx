"use client"

import Buy from "@/components/buy"
import ChartComponent from "@/components/chart"
import { useState } from "react"

import classNames from "classnames"
// import Modal from "@/components/modal"

// import { ChartBarIcon } from "@heroicons/react/24/outline"

export default function Page() {
    const [showChart, setShowChart] = useState(false)
    // const [modal, setModal] = useState(false)

    return (
        <div className="w-full flex justify-center">
            {/* <Modal
                buttons={[
                    {
                        label: "Ola",
                        onClick: () => setModal(false)
                    },
                    {
                        label: "Ola 2",
                        onClick: () => console.log("ok2"),
                        bgColor: "secondary"
                    }
                ]}
                // icon={
                //     <ChartBarIcon
                //         width={20}
                //         className="text-brand/secondary/500 dark:to-brand/primary/500"
                //     />
                // }
                // iconBgColor="bg-brand/secondary/100 dark:bg-brand/primary/100"
                message="ExtractoDAO is a privately owned Decentralized Autonomous Organization, sometimes called Decentralized Autonomous Corporation, owner of shared purpose blockchain and manager of a collective smart contract by DAO on Drawer technology that stores several individual smart contracts under the responsibility of each participant that is the contract auditor and issuer of the stablecon COW; And for the purposes of this document represented by the owner Joel Almeida creator, holder, issuer and holder In compliance with all laws of this country. ExtractoDAO It is virtually located in the Domain www.extractodao.com. ExtractoDAO is the rightful issuer of the ExtractoDAO Bull XBLL governance token contract 0x8110706a399D457D67b7A2B7636482b4bfCeBB21, issuer and keeper of the BULL tokens (XBLL) In conformity with all the laws of this.

                On the other hand, the holder of this smart contract is the legal administrator of the private keys and is fully responsible for managing the funds and generating the COW that will be private and sent back to the original wallet.
                Smart contract address: 0x0b32337D35f8CAB81180b031D9A244E088d0c926"
                open={modal}
                title="Members agreement in the form of production cooperation by ExtractoDAO Smart Contracts"
            /> */}
            <div className="container">
                <div
                    className={classNames({
                        "grid grid-cols-12 gap-6": showChart,
                        "flex justify-center": !showChart
                    })}
                >
                    <div
                        className={classNames({
                            "md:col-span-7 col-span-12": showChart,
                            hidden: !showChart
                        })}
                    >
                        <ChartComponent />
                    </div>
                    <div
                        className={classNames({
                            "md:col-span-5 col-span-12": showChart,
                            "w-full": !showChart
                        })}
                    >
                        <Buy
                            setShowChart={setShowChart}
                            showChart={showChart}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
