import AxiosService from "@/services/axios"
import env from "@/services/environment"
import { NextApiRequest, NextApiResponse } from "next"
import * as query from "../query"

const { BACKEND_ADDRESS } = env
const axiosInstance = new AxiosService(env)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const route = `${BACKEND_ADDRESS}/graphql`
        const response = await axiosInstance.post(
            route,
            JSON.stringify({
                query: query.allBuyPricess,
                variables: req.body
            }),
            {
                headers: {
                    APIKey: "abc-123"
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
