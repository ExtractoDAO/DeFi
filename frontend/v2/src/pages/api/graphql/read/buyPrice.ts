import { NextApiRequest, NextApiResponse } from "next"
import { Response, readerql } from "./readerql"
import { gql } from "@apollo/client"

export const ALL_BUY_PRICES_QUERY = gql`
    query GetAllBuyPrices($at: Int!, $total: Int!) {
        allBuyPrices(at: $at, total: $total) {
            items {
                value
                timestamp
            }
            totalItemsCount
        }
    }
`

export default async function allBuyPricesHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    type I = { at: number; total: number }
    type O = {
        allBuyPrices: {
            items: Array<{ timestamp: number; value: number }>
            totalItemsCount: number
        }
    }

    try {
        const result = await readerql<I, O>(
            ALL_BUY_PRICES_QUERY,
            {
                at: 0,
                total: 100
            },
            "allBuyPrices"
        )
        res.status(200).json(new Response(true, result, ""))
    } catch (e) {
        return res
            .status(400)
            .json(new Response(false, {}, "Failed to fetch buy prices."))
    }
}
