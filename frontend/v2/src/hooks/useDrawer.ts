import { Backend } from "@/services/backend/backend"
import env from "@/services/environment"
import AxiosService from "@/services/axios"
import { useEffect, useState } from "react"

const backend = new Backend(env, new AxiosService(env))

const useDrawer = () => {
    const [drawer, setDrawer] = useState([])

    useEffect(() => {
        async function getData() {
            const { data } = await backend.graphql.contracts()
            if (data?.items.length) {
                setDrawer(data.items)
            }
        }

        getData()
    }, [])

    return {
        drawer
    }
}

export default useDrawer
