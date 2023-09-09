/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        ALCHEMY_ID: process.env.ALCHEMY_ID,
        API_URL: process.env.API_URL,
        BACKEND_ADDRESS: process.env.BACKEND_ADDRESS,
        GRAPHQL_ADDRESS: process.env.GRAPHQL_ADDRESS,
        GRAPHQL_URL: process.env.GRAPHQL_URL,
        CHAIN_ID: process.env.CHAIN_ID,
        SIWE_VERSION: process.env.SIWE_VERSION,
        SIWE_STATEMENT: process.env.SIWE_STATEMENT,
        DOMAIN: process.env.DOMAIN,
        SIGNOUT_MESSAGE: process.env.SIGNOUT_MESSAGE,
        SIGNIN_MESSAGE: process.env.SIGNIN_MESSAGE,
        ORIGIN: process.env.ORIGIN
    }
}

module.exports = nextConfig
