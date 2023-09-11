import AxiosService from "@/services/axios"
import env from "@/services/environment"
import { NextApiRequest, NextApiResponse } from "next"

const { BACKEND_ADDRESS } = env

const axiosInstance = new AxiosService(env)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return new Promise<void>(async (resolve, reject) => {
        const { address } = req.query
        const route = `${BACKEND_ADDRESS}/login/signout/${address}`

        return axiosInstance
            .post(route, req.body, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                    res.end(response.data)
                    resolve()
                }
            })
            .catch((e) => {
                if (e.response) {
                    const { status, data } = e.response
                    res.status(status).end(data)
                    reject()
                } else {
                    res.status(500)
                    reject()
                }
            })
    })
}
