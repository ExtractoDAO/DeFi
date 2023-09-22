"use client"

import Select from "@/components/selector"

const TableLayoutSelector = () => {
    return (
        <>
            <div className="flex gap-1">
                <button>a</button>
                <button>b</button>
                <button>c</button>
            </div>
            <div className="bg-deep-gray/100 rounded mb-2">
                <Select
                    options={[
                        {
                            name: "Extract@ / Tether",
                            value: "extracto-usdt"
                        }
                    ]}
                    value="extracto-usdt"
                    onChange={(value) => console.log(value)}
                    placeholder="Teste"
                />
            </div>
        </>
    )
}

export default TableLayoutSelector
