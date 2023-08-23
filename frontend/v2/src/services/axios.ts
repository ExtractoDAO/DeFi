import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { Environment } from "./environment"

export default class AxiosService {
    private instance: AxiosInstance

    constructor(env: Environment) {
        this.instance = axios.create({
            baseURL: env.BACKEND_ADDRESS,
            timeout: 5000,
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.initializeResponseInterceptor()
    }
    private handleResponse = ({ data }: AxiosResponse) => data
    private handleError = (error: any) => Promise.reject(error)
    private initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this.handleResponse,
            this.handleError
        )
    }

    public async get(url: string, config?: AxiosRequestConfig) {
        try {
            const response = await this.instance.get(url, config)

            return response
        } catch (error) {
            throw error
        }
    }

    public async post(url: string, data?: any, config?: AxiosRequestConfig) {
        try {
            const response = await this.instance.post(url, data, config)
            return response
        } catch (error) {
            throw error
        }
    }
}
