import AxiosService from "@/services/axios"
import env from "@/services/environment"
import { AxiosError, isAxiosError } from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const { BACKEND_ADDRESS } = env
const axiosInstance = new AxiosService(env)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { address } = req.query
        const route = `${BACKEND_ADDRESS}/login/nonce/${address}`
        const response = await axiosInstance.get(route)

        if (response.status >= 200 && response.status <= 299) {
            res.status(response.status).json(response.data)
        } else {
            res.status(response.status).json({
                detail: response.data.detail
            })
        }
    } catch (err: any) {
        if (isAxiosError(err)) {
            const { status, message } = err

            res.status(Number(status || 500)).json({
                status_code: status,
                details: message
            })
        } else {
            res.status(500)
        }
    }
}
