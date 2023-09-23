"use client"

import { useState } from "react"
import Select from "@/components/selector"

export default function SelectContract() {
    const [selectedContract, setSelectedContract] = useState("")

    return (
        <Select
            value={selectedContract}
            onChange={(value) => setSelectedContract(value)}
            placeholder="Select a contract"
            label="Contract"
            options={[
                {
                    name: "Contract 01",
                    value: "0x6D544390Eb535d61e196c87d6B9c80dCD8628Acd"
                },
                {
                    name: "Contract 02",
                    value: "0x8203678f6fB1BFF06aFf4d1bCD0EdCCCeb1914e4"
                },
                {
                    name: "Contract 03",
                    value: "0xA6D6d7c556ce6Ada136ba32Dbe530993f128CA44"
                },
                {
                    name: "Contract 04",
                    value: "0xB1eDe3F5AC8654124Cb5124aDf0Fd3885CbDD1F7"
                }
            ]}
        />
    )
}
