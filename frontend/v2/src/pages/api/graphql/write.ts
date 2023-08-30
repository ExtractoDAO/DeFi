import AxiosService from "@/services/axios"
import env from "@/services/environment"
import { NextApiRequest, NextApiResponse } from "next"

const { BACKEND_ADDRESS } = env
const axiosInstance = new AxiosService(env)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const mutation = `
            mutation AddContractMutation(
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

        const route = `${BACKEND_ADDRESS}/graphql`
        const response = await axiosInstance.post(
            route,
            JSON.stringify({
                query: mutation,
                variables: req.body
            }),
            {
                headers: {
                    "X-Authorization": req.headers.authorization
                }
            }
        )

        if (response.status === 200) {
            res.status(200).json(response.data)
        } else {
            res.status(response.status).json({
                detail: response.data.detail
            })
        }
    } catch (err: any) {
        if (err.response) {
            const { status, data } = err.response
            res.status(status).json({ status_code: status, details: data })
        } else {
            res.status(500)
        }
    }
}
