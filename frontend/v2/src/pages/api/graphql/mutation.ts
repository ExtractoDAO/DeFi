export default `
mutation AddContractMutation(
    $txId: String!
    $address: String!
    $commodityAmount: Float!
    $locktime: Int!
    $owner: String!
    $price: Int!
) {
    addContract(
    txId: $txId
    address: $address
    commodityAmount: $commodityAmount
    locktime: $locktime
    owner: $owner
    price: $price
    ) {
    success
    message
    }
}
`
