import InputField from "@/components/inputField"
import Pagination from "@/components/pagination"
import TableContracts from "@/components/tableContracts"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function page() {
    return (
        <div>
            <div className="row-auto">
                <InputField placeholder="Search by contract name" />
            </div>
            <div className="row-auto">
                <TableContracts />
            </div>
            <div className="row-auto">
                <Pagination />
            </div>
        </div>
    )
}
