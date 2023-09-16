import { getItem } from "../storage"

interface Contract {
    txId: string
    address: string
    commodityAmount: number
    locktime: number
    owner: string
    price: number
}

export class GraphQL {
    TOKEN: string

    constructor() {
        this.TOKEN = getItem("TOKEN") || ""
    }

    private async fetchData(
        endpoint: string,
        method: "GET" | "POST" = "GET",
        body?: any
    ): Promise<any> {
        const headers: any = {
            "Content-Type": "application/json"
        }

        headers.authorization = this.TOKEN

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
        contract: Contract
    ): Promise<{ sucess: boolean; message: string }> {
        return this.fetchData(
            "/api/graphql/write/addContract",
            "POST",
            contract
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
        return this.fetchData(
            `/api/graphql/read/contracts/byInvestor/${investor}`
        )
    }

    async orders() {
        return this.fetchData("/api/graphql/read/orders/all")
    }
    async ordersByHash(hash: string) {
        return this.fetchData(`/api/graphql/read/orders/byHash/${hash}`)
    }

    async ordersByInvestor(investor: string) {
        return this.fetchData(`/api/graphql/read/orders/byInvestor/${investor}`)
    }

    async investors() {
        return this.fetchData("/api/graphql/read/investors/all")
    }
}
