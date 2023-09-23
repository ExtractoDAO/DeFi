export default function TableUserOrders() {
    const Pill = ({ status }: { status: number }) => {
        const stats: any = {
            0: {
                value: "Pending",
                bgColor: "bg-brand/primary/100",
                color: "text-brand/primary/500"
            },
            1: {
                value: "Active",
                bgColor: "bg-green/100",
                color: "text-green/800"
            },
            2: {
                value: "Burned",
                bgColor: "bg-green/100",
                color: "text-green/800"
            }
        }

        return (
            <span
                className={`px-2 rounded-xl font-medium text-sm ${stats[status]?.bgColor} ${stats[status]?.color}`}
            >
                {stats[status]?.value}
            </span>
        )
    }

    const Row = () => {
        return (
            <tr className="bg-white dark:bg-gray/900 border-b border-Default/gray/200 dark:border-deep-gray/200">
                <td className="px-6 py-4 text-gray/500">05-31-2023</td>
                <td className="px-6 py-4 text-gray/500">2.8 Kg</td>
                <td className="px-6 py-4 text-gray/500 text-center">
                    <Pill status={1} />
                </td>
                <td className="px-6 py-4 text-gray/500">0.58 (0.0 USD)</td>
                <td className="px-6 py-4 text-gray/500">
                    <button className="text-brand/secondary/500 font-medium text-sm dark:text-brand/primary/500">
                        Cancel
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
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {" "}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {new Array(4).fill("").map((e, i) => {
                        return <Row key={i} />
                    })}
                </tbody>
            </table>
        </div>
    )
}
