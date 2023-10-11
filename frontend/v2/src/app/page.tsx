export default async function Home() {
    const Box = ({
        title,
        value,
        description
    }: {
        title: string
        value: string
        description: string
    }) => (
        <div
            className="
                        flex
                        w-full
                        p-6
                        flex-col
                        gap-4
                        flex-[1 0 0]
                        first:rounded-l-lg
                        last:rounded-r-lg
                        border
                        border-solid
                        bg-brand/secondary/500
                        border-brand/secondary/600
                        dark:bg-brand/primary/500
                        dark:border-brand/primary/500"
        >
            <p
                className="text-gray/300
                            text-sm
                            not-italic
                            font-medium
                            dark:text-cool-gray/800
                            "
            >
                {title}
            </p>
            <div
                className="flex
                            items-end
                            gap-3"
            >
                <p
                    className="text-3xl
                                font-bold
                                not-italic
                                text-white
                                dark:text-deep-gray/100"
                >
                    {value}
                </p>
                <p
                    className="text-gray/300
                                text-sm
                                not-italic
                                font-normal
                                dark:text-cool-gray/800"
                >
                    {description}
                </p>
            </div>
        </div>
    )

    const Row = () => {
        return (
            <tr className="bg-white dark:bg-gray/900 border-b border-Default/gray/200 dark:border-deep-gray/200">
                <td className="px-6 py-4 text-gray/500 dark:bg-deep-gray/100">
                    248,85
                </td>
                <td className="px-6 py-4 text-gray/500 dark:bg-deep-gray/100">
                    2,30%
                </td>
                <td className="px-6 py-4 text-gray/500 dark:bg-deep-gray/100">
                    50,51
                </td>
                <td className="px-6 py-4 text-gray/500 dark:bg-deep-gray/100">
                    05-06-2023
                </td>
            </tr>
        )
    }

    return (
        <main>
            <div>
                <h1
                    className="text-gray/500
                        text-base
                        not-italic
                        font-medium
                        mb-4"
                >
                    Overview your account
                </h1>
                <div
                    className="
                        flex
                        w-full
                    "
                >
                    <Box title="Total Balance" value="400" description="USDT" />
                    <Box
                        title="Number of contracts"
                        value="30"
                        description="contracts pruchased"
                    />
                    <Box
                        title="Avaliable for withdrawal"
                        value="05"
                        description="contracts avaliable"
                    />
                    <Box
                        title="Value fat ox"
                        value="50,51"
                        description="Dollar"
                    />
                </div>

                <div className="relative overflow-x-auto ">
                    <h1
                        className="text-gray/500
                        text-base
                        not-italic
                        font-medium
                        mb-4
                        mt-8"
                    >
                        Fat ox price historic
                    </h1>
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs font-medium text-gray/500 uppercase bg-Default/gray/50 dark:border-deep-gray/200 border-b border-Default/gray/200 dark:bg-deep-gray/700 dark:text-gray/500">
                            <tr className="border border-Default/gray/200 dark:border-deep-gray/200">
                                <th scope="col" className="px-6 py-3">
                                    value
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    VAl./day
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    VALue US$
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    &nbsp;
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {new Array(8).fill("").map((_, i) => {
                                return <Row key={i} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}
