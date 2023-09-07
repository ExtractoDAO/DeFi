import { NextSSRApolloClient, NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr"
import { HttpLink } from "@apollo/client"
import env from "@/services/environment"

const link = new HttpLink({ uri: `${env.BACKEND_ADDRESS}/graphql` })
const cache = new NextSSRInMemoryCache()

export const client = new NextSSRApolloClient({ link, cache })
