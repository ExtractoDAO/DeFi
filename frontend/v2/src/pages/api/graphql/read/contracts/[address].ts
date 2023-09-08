import { NextApiRequest, NextApiResponse } from "next"
import { Response, readerql } from "../readerql" // Certifique-se de que o caminho para 'readerql' esteja correto
import { gql } from "@apollo/client"

export const CONTRACT_BY_ADDRESS_QUERY = gql`
    query GetContractByAddress($address: String!) {
        contractByAddress(address: $address) {
            address
            commodityAmount
            locktime
            owner
            price
            status
            txId
        }
    }
`

export default async function contractByAddressHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    type I = { address: string }
    type O = {
        contractByAddress: {
            address: string
            commodityAmount: number
            locktime: number
            owner: string
            price: number
            status: string
            txId: string
        }
    }

    const address = req.query.address as string

    if (!address) {
        return res
            .status(400)
            .json(new Response(false, {}, "Address is required."))
    }

    try {
        const result = await readerql<I, O>(
            CONTRACT_BY_ADDRESS_QUERY,
            { address },
            "contractByAddress"
        )
        res.status(200).json(new Response(true, result, ""))
    } catch (e) {
        return res
            .status(400)
            .json(
                new Response(false, {}, "Failed to fetch contract by address.")
            )
    }
}
