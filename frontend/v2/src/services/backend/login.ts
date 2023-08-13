import { SiweMessage } from "siwe"
import AxiosService from "../axios"
import { Environment } from "../environment"

interface Token {
    token: string
    expirationTime: string
}

export class Login {
    private readonly BACKEND_ADDRESS: string
    private readonly SIGNIN_MESSAGE: string
    private readonly SIGNOUT_MESSAGE: string
    private readonly SIWE_VERSION: string
    private readonly CHAIN_ID: number
    private readonly DOMAIN: string
    private readonly ORIGIN: string
    private readonly axiosInstance: AxiosService

    constructor(env: Environment, axiosService: AxiosService) {
        this.BACKEND_ADDRESS = env.BACKEND_ADDRESS
        this.SIGNIN_MESSAGE = env.SIGNIN_MESSAGE
        this.SIGNOUT_MESSAGE = env.SIGNOUT_MESSAGE

        this.SIWE_VERSION = env.SIWE_VERSION
        this.CHAIN_ID = env.CHAIN_ID
        this.DOMAIN = env.DOMAIN
        this.ORIGIN = env.ORIGIN

        this.axiosInstance = axiosService
    }

    private async getNonce(address: string): Promise<string> {
        const route = `${this.BACKEND_ADDRESS}/login/nonce/${address}`
        const data = await this.axiosInstance.get(route)
        return data.nonce
    }

    private async getToken(
        address: string,
        message: string,
        signature: string
    ): Promise<Token> {
        const route = `${this.BACKEND_ADDRESS}/login/signin/${address}`
        const data = await this.axiosInstance.post(
            route,
            { message: message, signature: signature },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        return {
            token: data.token,
            expirationTime: data.expiration_time
        }
    }

    private getMessage(
        address: string,
        nonce: string,
        statement: string
    ): SiweMessage {
        return new SiweMessage({
            version: this.SIWE_VERSION,
            chainId: this.CHAIN_ID,
            statement: statement,
            domain: this.DOMAIN,
            uri: this.ORIGIN,
            address: address,
            nonce: nonce
        })
    }

    async signIn(signer: string): Promise<Token> {
        const address = signer //.address
        const nonce = await this.getNonce(address)
        const message = this.getMessage(
            address,
            nonce,
            this.SIGNIN_MESSAGE
        ).prepareMessage()
        const signature = signer //.signMessage(message)
        return await this.getToken(address, message, signature)
    }

    async signOut(signer: string, token: string): Promise<boolean> {
        const address = signer //.address
        const nonce = this.extractNonce(token)
        const message = this.getMessage(
            address,
            nonce,
            this.SIGNOUT_MESSAGE
        ).prepareMessage()
        const signature = signer //.signMessage(message)
        return await this.removeToken(address, message, signature)
    }

    async removeToken(
        address: string,
        message: string,
        signature: string
    ): Promise<boolean> {
        const route = `${this.BACKEND_ADDRESS}/login/signout/${address}`
        const data = await this.axiosInstance.post(
            route,
            { message: message, signature: signature },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        return data.message
    }

    extractNonce(token: string): string {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace("-", "+").replace("_", "/")
        const payload = JSON.parse(window.atob(base64))
        return payload.nonce
    }
}
