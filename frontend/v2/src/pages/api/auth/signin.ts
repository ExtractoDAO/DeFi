import api from "@/services/axios"
import env from "@/services/environment"
import { NextApiRequest, NextApiResponse } from "next"

const { BACKEND_ADDRESS } = env

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log(req.body)
        const { address } = req.query
        const route = `${BACKEND_ADDRESS}/login/signin/${address}`
        const { status, data } = await api.post(route, JSON.parse(req.body))

        res.status(status).json(data)
    } catch (err: any) {
        res.status(err.response.status).json(err.response.data)
    }
}
