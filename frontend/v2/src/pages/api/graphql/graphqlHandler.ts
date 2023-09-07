import { client } from "./apolloClient"
import { DocumentNode } from "graphql"

export async function graphqlHandler(
    queryOrMutation: DocumentNode,
    variables: any,
    header: any
) {
    return await client.query({
        query: queryOrMutation,
        variables: variables,
        context: { headers: header }
    })
}
