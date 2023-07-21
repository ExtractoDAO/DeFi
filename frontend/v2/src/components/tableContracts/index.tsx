import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"

function TableContracts() {
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
                    <button className="text-brand/secondary/500 font-medium text-sm dark:text-brand/primary/500">
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
        </div>
    )
}

export default TableContracts
