import { SiweMessage } from "siwe"
import AxiosService from "../axios"
import { Environment } from "../environment"

export class Login {
    private readonly SIGNIN_MESSAGE: string
    private readonly SIGNOUT_MESSAGE: string
    private readonly SIWE_VERSION: string
    private readonly CHAIN_ID: number
    private readonly DOMAIN: string
    private readonly ORIGIN: string

    constructor(env: Environment, axiosService: AxiosService) {
        this.SIGNIN_MESSAGE = env.SIGNIN_MESSAGE
        this.SIGNOUT_MESSAGE = env.SIGNOUT_MESSAGE

        this.SIWE_VERSION = env.SIWE_VERSION
        this.CHAIN_ID = env.CHAIN_ID
        this.DOMAIN = env.DOMAIN
        this.ORIGIN = env.ORIGIN
    }

    private async getNonce(address: string): Promise<string> {
        try {
            const res = await fetch(`/api/auth/nonce/?address=${address}`, {
                method: "GET"
            })
            const data = await res.json()
            return data.nonce
        } catch (e: any) {
            throw new Error(e)
        }
    }

    private async getToken(
        address: string,
        message: string,
        signature: string
    ) {
        try {
            const response = await fetch(
                `/api/auth/signin/?address=${address}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        message: message,
                        signature: signature
                    })
                }
            )

            const data = await response.json()

            return {
                token: data.token,
                expirationTime: data.expiration
            }
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

    async signOut(signer: { address: string }): Promise<boolean> {
        const address = signer.address
        return await this.removeToken(address)
    }

    private async removeToken(address: string): Promise<boolean> {
        try {
            const response = await fetch(
                `/api/auth/signout/?address=${address}`
            )

            if (response.status >= 200 && response.status <= 299) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }

    extractNonce(token: string): string {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace("-", "+").replace("_", "/")
        const payload = JSON.parse(window.atob(base64))
        return payload.nonce
    }
}
