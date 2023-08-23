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
        const route = `${BACKEND_ADDRESS}/login/signin/${address}`
        const response = await axiosInstance.post(
            route,
            { message: req.body.message, signature: req.body.signature },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        res.status(201).json({
            token: response.data.token,
            expirationTime: response.data.expiration_time
        })
    } catch (err: any) {
        console.log(err)
        res.status(err.response.status).json(err.response.data)
    }
}
