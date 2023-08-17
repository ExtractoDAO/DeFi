import { NextApiRequest, NextApiResponse } from "next"

import axios from "axios"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response = await axios.post(
        `${process.env.API_URL}/login/signin/${req.query.address}`,
        {
            headers: {
                "Content-Type": "application/json"
            },
            body: req.body
        }
    )

    res.status(response.status).json(response.data)
}
