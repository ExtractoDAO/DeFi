import { NextApiRequest, NextApiResponse } from "next"
import { Response, readerql } from "../readerql" // Certifique-se de que o caminho para 'readerql' esteja correto
import { gql } from "@apollo/client"

export const ALL_ORDERS_QUERY = gql`
    query GetAllOrders($at: Int!, $total: Int!) {
        allOrders(at: $at, total: $total) {
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

export default async function allOrdersHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    type I = { at: number; total: number }
    type O = {
        allOrders: {
            items: Array<{
                contract: string
                hash: string
                investor: string
                kg: number
            }>
            totalItemsCount: number
        }
    }

    try {
        const result = await readerql<I, O>(
            ALL_ORDERS_QUERY,
            {
                at: 0,
                total: 10
            },
            "allOrders"
        )
        res.status(200).json(new Response(true, result, ""))
    } catch (e) {
        return res
            .status(400)
            .json(new Response(false, {}, "Failed to fetch all orders."))
    }
}
