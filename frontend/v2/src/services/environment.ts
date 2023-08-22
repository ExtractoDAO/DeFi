import dotenv from "dotenv"

class MissingEnvironmentVariableError extends Error {
    constructor(name: string) {
        const warn = "\nAPPLICATION CAN NOT START WITHOUT THIS VAR ENV!"
        const message = `Missing environment variable: ${name}${warn}`
        super(message)

        this.name = "MissingEnvironmentVariableError"

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, MissingEnvironmentVariableError)
        }
    }
}

export class Environment {
    BACKEND_ADDRESS: string
    SIGNOUT_MESSAGE: string
    SIGNIN_MESSAGE: string
    SIWE_VERSION: string
    CHAIN_ID: number
    DOMAIN: string
    ORIGIN: string

    constructor() {
        dotenv.config()
        this.BACKEND_ADDRESS = this.ensure(
            "BACKEND_ADDRESS",
            process.env.BACKEND_ADDRESS
        )
        this.SIGNOUT_MESSAGE = this.ensure(
            "SIGNOUT_MESSAGE",
            process.env.SIGNOUT_MESSAGE
        )
        this.SIGNIN_MESSAGE = this.ensure(
            "SIGNIN_MESSAGE",
            process.env.SIGNIN_MESSAGE
        )
        this.SIWE_VERSION = this.ensure(
            "SIWE_VERSION",
            process.env.SIWE_VERSION
        )
        this.CHAIN_ID = parseInt(this.ensure("CHAIN_ID", process.env.CHAIN_ID))
        this.DOMAIN = this.ensure("DOMAIN", process.env.DOMAIN)
        this.ORIGIN = this.ensure("ORIGIN", process.env.ORIGIN)
    }

    ensure(key: string, value?: string): string {
        if (!value) {
            throw new MissingEnvironmentVariableError(key)
        }

        return value
    }
}

const env = new Environment()
export default env
