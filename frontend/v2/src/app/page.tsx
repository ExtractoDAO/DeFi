// import { gql } from "@apollo/client"
// import { getClient } from "@/lib/client"

// const client = getClient()

export default async function Home() {
    // const query = gql`
    //     query {
    //         launchLatest {
    //             mission_name
    //         }
    //     }
    // `

    // const { data } = await getClient().mutate({ mutation:  })

    // console.log(process.env.GRAPHQL_URL)

    return (
        <main>
            <h2 className="text-brand/secondary/500 dark:text-brand/primary/500">
                Hello world
            </h2>
        </main>
    )
}
