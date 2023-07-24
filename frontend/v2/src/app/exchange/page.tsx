export default function page() {
    return (
        <>
            <div className="p-2 border-b border-gray/200">
                <button></button>
            </div>
            <div className="p-6 max-md:px-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 lg:col-7">
                            <div className="bg-white rounded-md w-full h-[600px]">
                                Chart
                            </div>
                            <div className="row">
                                <div className="col-12 lg:col-6">
                                    <div className="bg-white rounded-md w-full h-[200px]">
                                        Buy
                                    </div>
                                </div>
                                <div className="col-12 lg:col-6">
                                    <div className="bg-white rounded-md w-full h-[200px]">
                                        Sell
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-5">
                            <div className="bg-white rounded-md w-full h-[800px]">
                                Orderbook
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="bg-white rounded-md w-full h-[600px]">
                                User orders
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
