"use client"

import InputField from "@/components/inputField"
import Pagination from "@/components/pagination"
import TableContracts from "@/components/tableContracts"
import useDrawer from "@/hooks/useDrawer"

export default function Page() {
    const { drawer } = useDrawer()

    console.log(drawer)

    return (
        <div>
            <div className="row-auto">
                <InputField placeholder="Search by contract name" />
            </div>
            <div className="row-auto">
                <TableContracts contractList={drawer} />
            </div>
            {/* <div className="row-auto">
                <Pagination />
            </div> */}
        </div>
    )
}
