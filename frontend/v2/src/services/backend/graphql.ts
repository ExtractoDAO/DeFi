interface Contract {
    txId: string
    address: string
    commodityAmount: number
    locktime: number
    owner: string
    price: number
}

export class GraphQL {
    private async fetchData(
        endpoint: string,
        method: "GET" | "POST" = "GET",
        body?: any,
        token?: string
    ): Promise<any> {
        const headers: any = {
            "Content-Type": "application/json"
        }

        if (token) {
            headers.authorization = token
        }

        return await fetch(endpoint, {
            method,
            body: JSON.stringify(body),
            headers
        })
            .then((response) => response.json())
            .catch((error) => {
                throw new Error(error)
            })
    }

    async addContract(
        contract: Contract,
        token: string
    ): Promise<{ sucess: boolean; message: string }> {
        return this.fetchData(
            "/api/graphql/write/addContract",
            "POST",
            contract,
            token
        )
    }

    async sellPrices() {
        return this.fetchData("/api/graphql/read/sellPrice")
    }

    async buyPrices() {
        return this.fetchData("/api/graphql/read/buyPrice")
    }

    async contracts() {
        return this.fetchData("/api/graphql/read/contracts/all")
    }

    async contractByAddress(address: string) {
        return this.fetchData(`/api/graphql/read/contracts/${address}`)
    }

    async contractByInvestor(investor: string) {
        return this.fetchData(`/api/graphql/read/contracts/${investor}`)
    }

    async investors() {
        return this.fetchData("/api/graphql/read/investors/all")
    }
}
