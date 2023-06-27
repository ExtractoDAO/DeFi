import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client"

import { onError } from "@apollo/client/link/error"

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
            console.error(`GraphQL error ${message}`)
        })
    }
})

const link = from([
    errorLink,
    new HttpLink({
        uri: process.env.GRAPHQL_URL
    })
])

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
})
