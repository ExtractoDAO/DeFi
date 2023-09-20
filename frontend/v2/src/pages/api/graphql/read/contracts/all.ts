import { NextApiRequest, NextApiResponse } from "next"
import { Response, readerql } from "../readerql"
import { gql } from "@apollo/client"

export const ALL_CONTRACTS_QUERY = gql`
    query GetAllContracts($at: Int!, $total: Int!) {
        allContracts(at: $at, total: $total) {
            items {
                address
                commodityAmount
                locktime
                owner
                price
                status
                txId
                block
            }
            totalItemsCount
        }
    }
`

export default async function allContractsHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    type I = { at: number; total: number }
    type O = {
        allContracts: {
            items: Array<{
                address: string
                commodityAmount: number
                locktime: number
                owner: string
                price: number
                status: string
                txId: string
                block: number
            }>
            totalItemsCount: number
        }
    }

    try {
        const result = await readerql<I, O>(
            ALL_CONTRACTS_QUERY,
            {
                at: 0,
                total: 100
            },
            "allContracts"
        )
        res.status(200).json(new Response(true, result, ""))
    } catch (e) {
        return res
            .status(400)
            .json(new Response(false, {}, "Failed to fetch contracts."))
    }
}
