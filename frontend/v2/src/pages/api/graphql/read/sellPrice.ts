import { NextApiRequest, NextApiResponse } from "next"
import { Response, readerql } from "./readerql"
import { gql } from "@apollo/client"

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
    type I = { at: number; total: number }
    type O = {
        allSellPrices: {
            items: Array<{ timestamp: number; value: number }>
            totalItemsCount: number
        }
    }

    try {
        const result = await readerql<I, O>(
            ALL_SELL_PRICES_QUERY,
            {
                at: 0,
                total: 100
            },
            "allSellPrices"
        )
        res.status(200).json(new Response(true, result, ""))
    } catch (e) {
        return res
            .status(400)
            .json(new Response(false, {}, "Failed to fetch sell prices."))
    }
}
