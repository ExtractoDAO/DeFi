"use client"

import Select from "@/components/selector"

interface ISelectContract {
    list: string[]
    selected: string
    onChage: (contract: string) => void
}

export default function SelectContract({
    list,
    onChage,
    selected
}: ISelectContract) {
    return (
        <Select
            value={selected}
            onChange={(value) => onChage(value)}
            placeholder="Select a contract"
            label="Contract"
            options={
                list
                    ? list.map((e) => {
                          return {
                              name: e,
                              value: e
                          }
                      })
                    : []
            }
        />
    )
}
