import {
    NextSSRApolloClient,
    NextSSRInMemoryCache
} from "@apollo/experimental-nextjs-app-support/ssr"
import { gql, HttpLink } from "@apollo/client"
import { NextApiRequest, NextApiResponse } from "next"
import env from "@/services/environment"

const link = new HttpLink({ uri: `${env.BACKEND_ADDRESS}/graphql` })
const cache = new NextSSRInMemoryCache()
const client = new NextSSRApolloClient({ link, cache })

export const ALL_SELL_PRICES_QUERY = gql`
    query GetAllSellPrices($at: Int!, $total: Int!) {
        allSellPrices(at: $at, total: $total) {
            items {
                value
                timestamp
            }
            totalItemsCount
        }
    }
`

export default async function allSellPricesHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const result = await client.query({
        query: ALL_SELL_PRICES_QUERY,
        variables: { at: 0, total: 10 }
    })

    const response = result.data?.allSellPrices

    if (response) {
        res.status(200).json(response)
    } else {
        return res.status(400).json({
            sucess: false,
            message: "Failed to fetch sell prices."
        })
    }
}
