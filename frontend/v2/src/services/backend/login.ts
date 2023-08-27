import { SiweMessage } from "siwe"
import api from "../axios"
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

    constructor(env: Environment) {
        this.BACKEND_ADDRESS = env.BACKEND_ADDRESS
        this.SIGNIN_MESSAGE = env.SIGNIN_MESSAGE
        this.SIGNOUT_MESSAGE = env.SIGNOUT_MESSAGE

        this.SIWE_VERSION = env.SIWE_VERSION
        this.CHAIN_ID = env.CHAIN_ID
        this.DOMAIN = env.DOMAIN
        this.ORIGIN = env.ORIGIN
    }

    private async getNonce(address: string): Promise<string> {
        const route = `/api/auth/nonce/?address=${address}`
        const data = await fetch(route, {
            method: "GET"
        })

        const res = await data.json()

        return res.nonce
    }

    private async getToken(
        address: string,
        message: string,
        signature: string
    ) {
        try {
            const route = `/api/auth/signin/?address=${address}`

            const data = await fetch(route, {
                method: "POST",
                body: JSON.stringify({ message: message, signature: signature })
            })

            const res = await data.json()

            return {
                token: res.token,
                expirationTime: res.expiration_time
            }
        } catch (err: any) {
            throw new Error(err)
        }
    }

    private getMessage(address: string, nonce: string, statement: string): any {
        return new SiweMessage({
            version: this.SIWE_VERSION,
            chainId: this.CHAIN_ID,
            statement: statement,
            domain: this.DOMAIN,
            address: address,
            nonce: nonce,
            uri: "http://localhost/"
        })
    }

    async signIn(signer: {
        address: string
        signMessage: (message: string) => Promise<string>
    }) {
        const address = signer.address
        const nonce = await this.getNonce(address)

        const message = this.getMessage(
            address,
            nonce,
            this.SIGNIN_MESSAGE
        ).prepareMessage()

        const signature = await signer.signMessage(message)
        return await this.getToken(address, message, signature)
    }

    async signOut(signer: {
        token: string
        address: string
        signMessage: (message: string) => Promise<string>
    }): Promise<boolean> {
        // TODO: security validation
        const nonce = this.extractNonce(signer.token)
        const message = this.getMessage(
            signer.address,
            nonce,
            this.SIGNOUT_MESSAGE
        ).prepareMessage()
        const signature = await signer.signMessage(message)
        return await this.removeToken(signer.address, message, signature)
    }

    // TODO: move to page/api/auth
    async removeToken(
        address: string,
        message: string,
        signature: string
    ): Promise<boolean> {
        const route = `${this.BACKEND_ADDRESS}/login/signout/${address}`
        const data = await api.post(
            route,
            { message: message, signature: signature },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        return data.data.message
    }

    extractNonce(token: string): string {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace("-", "+").replace("_", "/")
        const payload = JSON.parse(window.atob(base64))
        return payload.nonce
    }
}
