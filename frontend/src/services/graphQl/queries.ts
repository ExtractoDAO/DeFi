import { gql } from "@apollo/client"

export const LOAD_DRAWER = gql`
    query GetContractsByInvestor($investor: String = "") {
        contractsByInvestor(investor: $investor) {
            address
            kg
            locktime
            owner
            burn
            price
        }
    }
`
