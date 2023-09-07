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
            body: JSON.stringify(contract),
            headers: {
                authorization: token,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((data) => {
                return {
                    token: data.token,
                    expirationTime: data.expiration_time
                }
            })
            .catch((error) => {
                throw new Error(error)
            })
    }
}
