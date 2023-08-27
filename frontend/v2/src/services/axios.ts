import axios from "axios"

const api = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
})

// api.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`

export default api
