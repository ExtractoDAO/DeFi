import { SiweMessage } from "siwe"
import AxiosService from "../axios"
import { Environment } from "../environment"

interface Token {
    token: string
    expirationTime: string
}

export class Login {
    private readonly SIGNIN_MESSAGE: string
    private readonly SIGNOUT_MESSAGE: string
    private readonly SIWE_VERSION: string
    private readonly CHAIN_ID: number
    private readonly DOMAIN: string
    private readonly ORIGIN: string

    constructor(env: Environment) {
        this.SIGNIN_MESSAGE = env.SIGNIN_MESSAGE
        this.SIGNOUT_MESSAGE = env.SIGNOUT_MESSAGE

        this.SIWE_VERSION = env.SIWE_VERSION
        this.CHAIN_ID = env.CHAIN_ID
        this.DOMAIN = env.DOMAIN
        this.ORIGIN = env.ORIGIN
    }

    private async getNonce(address: string): Promise<string> {
        const route = `/api/auth/nonce/?address=${address}`
        return await fetch(route)
            .then((respose) => respose.json())
            .then((data) => data.nonce)
    }

    private async getToken(
        address: string,
        message: string,
        signature: string
    ) {
        try {
            return await fetch(`/api/auth/signin/?address=${address}`, {
                method: "POST",
                body: JSON.stringify({ message: message, signature: signature })
            })
                .then((response) => response.json())
                .then((data) => {
                    return {
                        token: data.token,
                        expirationTime: data.expiration_time
                    }
                })
        } catch (err: any) {
            throw new Error(err)
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
        address: string
        token: string
        signMessage: (message: string) => Promise<string>
    }): Promise<boolean> {
        const address = signer.address
        const nonce = this.extractNonce(signer.token)
        const message = this.getMessage(
            address,
            nonce,
            this.SIGNOUT_MESSAGE
        ).prepareMessage()
        const signature = await signer.signMessage(message)
        return await this.removeToken(address, message, signature)
    }

    async removeToken(
        address: string,
        message: string,
        signature: string
    ): Promise<boolean> {
        return await fetch(`/api/auth/signout/?address=${address}`, {
            method: "POST",
            body: JSON.stringify({ message: message, signature: signature })
        })
            .then((response) => response.json())
            .then((data) => data.message)
    }

    extractNonce(token: string): string {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace("-", "+").replace("_", "/")
        const payload = JSON.parse(window.atob(base64))
        return payload.nonce
    }
}
