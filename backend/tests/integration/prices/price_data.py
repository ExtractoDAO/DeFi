query_buy = """
query {
    allBuyPrices {
        items {
            value
            timestamp
        }
    }
}
"""
query_sell = """
query {
    allSellPrices {
        items {
            value
            timestamp
        }
    }
}
"""


raw_data_buy = {"1675825175": 3.87}
raw_data_sell = {"1675825175": 3.77}
