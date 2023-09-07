export const allSellPricess = `
query GetAllSellPrices($at: Int! $total: Int!) {
    allSellPrices(at: $at, total: $total) {
        items {
            value
            timestamp
        }
        totalItemsCount
    }
  }
`

export const allBuyPricess = `
query GetAllBuyPrices($at: Int! $total: Int!) {
    allBuyPrices(at: $at, total: $total) {
        items {
            value
            timestamp
        }
        totalItemsCount
    }
  }
`
