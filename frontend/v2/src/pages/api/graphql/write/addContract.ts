import { NextApiRequest, NextApiResponse } from "next"
import { gql } from "@apollo/client"
import { client } from "../apolloClient"

export const ADD_CONTRACT_MUTATION = gql`
    mutation AddContract(
        $txId: String!
        $address: String!
        $commodityAmount: Float!
        $locktime: Int!
        $owner: String!
        $price: Int!
        $block: Int!
    ) {
        addContract(
            txId: $txId
            address: $address
            commodityAmount: $commodityAmount
            locktime: $locktime
            owner: $owner
            price: $price
            block: $block
        ) {
            success
            message
        }
    }
`

export interface Contract {
    txId: string
    address: string
    commodityAmount: number
    locktime: number
    owner: string
    price: number
    block: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const result = await client.mutate<
        { addContract: { success: boolean; message: string } },
        Contract
    >({
        mutation: ADD_CONTRACT_MUTATION,
        variables: req.body,
        context: {
            headers: {
                authorization: req.headers.authorization
            }
        }
    })

    const response = result.data?.addContract

    if (response && response.success === true) {
        res.status(200).json({
            sucess: true,
            message: ""
        })
    } else {
        return res.status(400).json({
            sucess: false,
            message: response?.message
        })
    }
}
