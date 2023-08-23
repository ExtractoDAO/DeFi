import AxiosService from "@/services/axios"
import env from "@/services/environment"
import { AxiosError } from "axios"
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
        const data = await axiosInstance.get(route)

        return res.status(200).json(data)
    } catch (e: any) {
        res.status(e.response.status).json(e.response.data)
    }
}
