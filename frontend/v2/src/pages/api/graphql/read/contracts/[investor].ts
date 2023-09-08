// pages/api/graphql/read/contractsByInvestor/[investor].ts

import { NextApiRequest, NextApiResponse } from "next"
import { Response, readerql } from "../readerql" // Certifique-se de que o caminho para 'readerql' esteja correto
import { gql } from "@apollo/client"

export const CONTRACTS_BY_INVESTOR_QUERY = gql`
    query ContractsByInvestor($investor: String!, $at: Int!, $total: Int!) {
        contractsByInvestor(investor: $investor, at: $at, total: $total) {
            items {
                address
                commodityAmount
                locktime
                owner
                price
                status
                txId
            }
            totalItemsCount
        }
    }
`

export default async function contractsByInvestorHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    type I = { investor: string; at: number; total: number }
    type O = {
        contractsByInvestor: {
            items: Array<{
                address: string
                commodityAmount: number
                locktime: number
                owner: string
                price: number
                status: string
                txId: string
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
            CONTRACTS_BY_INVESTOR_QUERY,
            {
                investor,
                at: 0,
                total: 100
            },
            "contractsByInvestor"
        )
        res.status(200).json(new Response(true, result, ""))
    } catch (e) {
        return res
            .status(400)
            .json(
                new Response(
                    false,
                    {},
                    "Failed to fetch contracts by investor."
                )
            )
    }
}
