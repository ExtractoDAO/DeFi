import { NextApiRequest, NextApiResponse } from "next"
import { Response, readerql } from "../../readerql"
import { gql } from "@apollo/client"

export const ORDER_BY_HASH_QUERY = gql`
    query GetOrderByHash($txHash: String!) {
        orderByHash(txHash: $txHash) {
            contract
            hash
            investor
            kg
        }
    }
`

export default async function orderByHashHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    type I = { txHash: string }
    type O = {
        orderByHash: {
            contract: string
            hash: string
            investor: string
            kg: number
        }
    }

    const txHash = req.query.hash as string

    if (!txHash) {
        return res
            .status(400)
            .json(new Response(false, {}, "txHash is required."))
    }

    try {
        const result = await readerql<I, O>(
            ORDER_BY_HASH_QUERY,
            { txHash },
            "orderByHash"
        )
        res.status(200).json(new Response(true, result, ""))
    } catch (e) {
        return res
            .status(400)
            .json(new Response(false, {}, "Failed to fetch order by hash."))
    }
}
