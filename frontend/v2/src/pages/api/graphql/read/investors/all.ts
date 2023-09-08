import { NextApiRequest, NextApiResponse } from "next"
import { Response, readerql } from "../readerql"
import { gql } from "@apollo/client"

export const ALL_INVESTORS_QUERY = gql`
    query GetAllInvestors($at: Int!, $total: Int!) {
        allInvestors(at: $at, total: $total) {
            items {
                address
            }
            totalItemsCount
        }
    }
`

export default async function allInvestorsHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    type I = { at: number; total: number }
    type O = {
        allInvestors: {
            items: Array<{ address: string }>
            totalItemsCount: number
        }
    }

    try {
        const result = await readerql<I, O>(
            ALL_INVESTORS_QUERY,
            {
                at: 10,
                total: 10
            },
            "allInvestors"
        )
        res.status(200).json(new Response(true, result, ""))
    } catch (e) {
        return res
            .status(400)
            .json(new Response(false, {}, "Failed to fetch investors."))
    }
}
