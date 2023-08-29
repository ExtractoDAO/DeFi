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
        const { address } = req.query
        const route = `${BACKEND_ADDRESS}/login/signout/${address}`

        const response = await axiosInstance.post(route, req.body, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.status === 200) {
            res.status(200)
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
