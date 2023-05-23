const nextConfig = {
    reactStrictMode: false,
    env: {
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
        JWT_KEY: process.env.JWT_KEY,
        EXTRACTO_FIREBASE_LOGIN: process.env.EXTRACTO_FIREBASE_LOGIN,
        EXTRACTO_FIREBASE_PASS: process.env.EXTRACTO_FIREBASE_PASS,
        NETWORK: process.env.NETWORK,
        GRAPHQL_URL: process.env.GRAPHQL_URL,
        ALCHEMY_ID: process.env.ALCHEMY_ID
    }
}

module.exports = nextConfig
