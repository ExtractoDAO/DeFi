export default async function Home() {
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
                    className="flex
                       w-full"
                >
                    <div
                        className="flex
                        w-full
                        p-6
                        flex-col
                        gap-4
                        flex-[1 0 0]
                        rounded-l-lg
                        border
                        border-solid
                        bg-brand/secondary/500
                        border-brand/secondary/600"
                    >
                        <p
                            className="text-gray/300
                            text-sm
                            not-italic
                            font-medium
                            "
                        >
                            Total Balance
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
                                text-white"
                            >
                                400
                            </p>
                            <p
                                className="text-gray/300
                                text-sm
                                not-italic
                                font-normal"
                            >
                                USDT
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex
                          w-full
                          p-6
                          flex-col
                          gap-4
                          flex-[1 0 0]
                          border
                          border-solid
                          bg-brand/secondary/500
                          border-brand/secondary/600"
                    >
                        <p
                            className="text-gray/300
                            text-sm
                            not-italic
                            font-medium
                            "
                        >
                            Number of contracts
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
                                text-white"
                            >
                                30
                            </p>
                            <p
                                className="text-gray/300
                                text-sm
                                not-italic
                                font-normal"
                            >
                                contracts pruchased
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex
                          w-full
                          p-6
                          flex-col
                          gap-4
                          flex-[1 0 0]
                          border
                          border-solid
                          bg-brand/secondary/500
                          border-brand/secondary/600"
                    >
                        <p
                            className="text-gray/300
                            text-sm
                            not-italic
                            font-medium
                            "
                        >
                            Avaliable for withdrawal
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
                                text-white"
                            >
                                05
                            </p>
                            <p
                                className="text-gray/300
                                text-sm
                                not-italic
                                font-normal"
                            >
                                contracts avaliable
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex
                          w-full
                          p-6
                          flex-col
                          gap-4
                          flex-[1 0 0]
                          rounded-r-lg
                          border
                          border-solid
                          bg-brand/secondary/500
                          border-brand/secondary/600"
                    >
                        <p
                            className="text-gray/300
                            text-sm
                            not-italic
                            font-medium
                            "
                        >
                            Value fat ox
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
                                text-white"
                            >
                                50,51
                            </p>
                            <p
                                className="text-gray/300
                                text-sm
                                not-italic
                                font-normal"
                            >
                                Dollar
                            </p>
                        </div>
                    </div>
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
                    <table
                        className="w-full
                            text-sm
                            text-left
                            text-gray-500
                            border
                            border-gray/200
                            rounded
                            "
                    >
                        <thead
                            className="h-[38px]
                                justify-center
                                items-start
                                self-stretch
                                text-gray/500
                                font-medium
                                not-italic
                                uppercase
                                text-xs"
                        >
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    VALUE
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    VAl./DAY
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    VALUE US$
                                </th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                className="h-[72px]
                                px-6
                                py-4
                                justify-center
                                items-start
                                gap-[10px]
                                self-stretch
                                text-gray/500
                                not-italic
                                font-normal
                                text-sm"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    1
                                </th>
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4">3</td>
                                <td className="px-6 py-4">4</td>
                            </tr>
                            <tr
                                className="h-[72px]
                                px-6
                                py-4
                                justify-center
                                items-start
                                gap-[10px]
                                self-stretch
                                text-gray/500
                                not-italic
                                font-normal
                                text-sm"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    53
                                </th>
                                <td className="px-6 py-4">34</td>
                                <td className="px-6 py-4">45</td>
                                <td className="px-6 py-4">78</td>
                            </tr>
                            <tr
                                className="h-[72px]
                                px-6
                                py-4
                                justify-center
                                items-start
                                gap-[10px]
                                self-stretch
                                text-gray/500
                                not-italic
                                font-normal
                                text-sm"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    89
                                </th>
                                <td className="px-6 py-4">90</td>
                                <td className="px-6 py-4">786</td>
                                <td className="px-6 py-4">678978</td>
                            </tr>
                            <tr
                                className="h-[72px]
                                px-6
                                py-4
                                justify-center
                                items-start
                                gap-[10px]
                                self-stretch
                                text-gray/500
                                not-italic
                                font-normal
                                text-sm"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    567
                                </th>
                                <td className="px-6 py-4">234</td>
                                <td className="px-6 py-4">897</td>
                                <td className="px-6 py-4">56768</td>
                            </tr>
                            <tr
                                className="h-[72px]
                                px-6
                                py-4
                                justify-center
                                items-start
                                gap-[10px]
                                self-stretch
                                text-gray/500
                                not-italic
                                font-normal
                                text-sm"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    457656
                                </th>
                                <td className="px-6 py-4">5678</td>
                                <td className="px-6 py-4">56785679</td>
                                <td className="px-6 py-4">789789</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}
