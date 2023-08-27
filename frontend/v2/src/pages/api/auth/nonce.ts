import api from "@/services/axios"
import env from "@/services/environment"

import { NextApiRequest, NextApiResponse } from "next"

const { BACKEND_ADDRESS } = env

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { address } = req.query
        const route = `${BACKEND_ADDRESS}/login/nonce/${address}`
        const { status, data } = await api.get(route)
        return res.status(status).json(data)
    } catch (e: any) {
        res.status(e.response.status).json(e.response.data)
    }
}
