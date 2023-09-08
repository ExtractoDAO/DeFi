interface Contract {
    txId: string
    address: string
    commodityAmount: number
    locktime: number
    owner: string
    price: number
}

export class GraphQL {
    async addContract(contract: Contract, token: string) {
        return await fetch("/api/graphql/write", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(contract)
        })
            .then((response) => response.json())
            .then((data) => data)
    }
}
