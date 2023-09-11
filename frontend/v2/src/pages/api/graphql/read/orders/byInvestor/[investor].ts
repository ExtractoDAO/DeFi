import { NextApiRequest, NextApiResponse } from "next"
import { Response, readerql } from "../../readerql"
import { gql } from "@apollo/client"

export const ORDERS_BY_INVESTOR_QUERY = gql`
    query GetOrdersByInvestor($at: Int!, $investor: String!, $total: Int!) {
        ordersByInvestor(at: $at, investor: $investor, total: $total) {
            items {
                contract
                hash
                investor
                kg
            }
            totalItemsCount
        }
    }
`

export default async function ordersByInvestorHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    type I = { at: number; investor: string; total: number }
    type O = {
        ordersByInvestor: {
            items: Array<{
                contract: string
                hash: string
                investor: string
                kg: number
            }>
            totalItemsCount: number
        }
    }

    const investor = req.query.investor as string

    if (!investor) {
        return res
            .status(400)
            .json(new Response(false, {}, "Investor is required."))
    }

    try {
        const result = await readerql<I, O>(
            ORDERS_BY_INVESTOR_QUERY,
            {
                investor: investor,
                at: 0,
                total: 100
            },
            "ordersByInvestor"
        )
        res.status(200).json(new Response(true, result, ""))
    } catch (e) {
        return res
            .status(400)
            .json(
                new Response(false, {}, "Failed to fetch orders by investor.")
            )
    }
}
