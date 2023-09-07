interface Contract {
    txId: string
    address: string
    commodityAmount: number
    locktime: number
    owner: string
    price: number
}

export class GraphQL {
    async addContract(
        contract: Contract,
        token: string
    ): Promise<{ sucess: boolean; message: string }> {
        return await fetch("/api/graphql/write/addContract", {
            method: "POST",
            body: JSON.stringify(contract),
            headers: {
                authorization: token,
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((error) => {
                throw new Error(error)
            })
    }
    async sellPrices() {
        return await fetch("/api/graphql/read/sellPrice")
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((error) => {
                throw new Error(error)
            })
    }
}
