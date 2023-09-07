import { NextApiRequest, NextApiResponse } from "next"
import { gql, HttpLink } from "@apollo/client"
import {
    NextSSRApolloClient,
    NextSSRInMemoryCache
} from "@apollo/experimental-nextjs-app-support/ssr"

interface Contract {
    txId: string
    address: string
    commodityAmount: number
    locktime: number
    owner: string
    price: number
}

const ADD_CONTRACT_MUTATION = gql`
    mutation AddContract(
        $txId: String!
        $address: String!
        $commodityAmount: Float!
        $locktime: Int!
        $owner: String!
        $price: Int!
    ) {
        addContract(
            txId: $txId
            address: $address
            commodityAmount: $commodityAmount
            locktime: $locktime
            owner: $owner
            price: $price
        ) {
            success
            message
        }
    }
`

// Configuração do Apollo Client
const link = new HttpLink({ uri: "http://127.0.0.1:8000/graphql" })
const cache = new NextSSRInMemoryCache()
const client = new NextSSRApolloClient({ link, cache })

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response = await client.mutate<
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

    if (response.data?.addContract.success === true) {
        return res.status(200).send({ message: "Success" })
    } else {
        console.log(response.data?.addContract.message)
        return res
            .status(400)
            .json({ message: response.data?.addContract.message })
    }
}
