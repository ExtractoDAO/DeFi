import { ApolloQueryResult, OperationVariables } from "@apollo/client"
import { client } from "../apolloClient"
import { DocumentNode } from "graphql"

function removeTypename(data: any): any {
    if (Array.isArray(data)) {
        return data.map((item) => removeTypename(item))
    } else if (typeof data === "object" && data !== null) {
        const newData: any = {}
        Object.keys(data).forEach((key) => {
            if (key !== "__typename") {
                newData[key] = removeTypename(data[key])
            }
        })
        return newData
    }
    return data
}

export async function readerql<I extends OperationVariables, O>(
    query: DocumentNode,
    variables: I,
    unpackKey: keyof O
): Promise<O[keyof O]> {
    let result
    try {
        result = await client.query<O, I>({ query, variables })
    } catch (error) {
        console.error("Error executing GraphQL query:", error)
        throw error
    }

    const rawData = result.data[unpackKey]
    return removeTypename(rawData)
}

export class Response {
    constructor(
        public sucess: boolean,
        public data: any,
        public message: string
    ) {}
}
